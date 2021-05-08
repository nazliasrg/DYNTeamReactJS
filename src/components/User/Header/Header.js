import React, { Component, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import { Link, withRouter } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import { ReactSession } from 'react-client-session';
// import { useHistory } from "react-router-dom";

ReactSession.setStoreType("localStorage");

class Header extends Component {
    authHeader = () => {
        const user = JSON.parse(localStorage.getItem('data_user'));
        console.log(user)

        if (user && user.data.token) {
            return {
                'authorization': `Bearer ${user.data.token}`
            }
        }
        else {
            return null;
        }
    }

    constructor(props) {
        super(props);

        

        this.state = {
            widthStyle: '0%',
            user: ""
        }
    }
    // history = useHistory()

    async componentDidMount() {
        
        const width = await this.state.widthStyle
        await console.log(width)
        const dataUser = await JSON.parse(localStorage.getItem('data_user'))
        if(dataUser!=null){
            await this.setState({
                user: dataUser.data.username
            })
        }
        
    }

    handleCloseNav = () => {
        this.setState({
            widthStyle: '0%'
        })
    }

    handleOpenNav = () => {
        this.setState({
            widthStyle: '100%'
        })
    }

    logout=() => {
        localStorage.clear();
    }
    

    render() {
        const styles = {
            widthNavbar: {
                width: this.state.widthStyle,
            }
        };

        const { widthNavbar } = styles;

        const { user } = this.state;

        return (
            <Fragment>
                <div className="nav-container" id="navbar2">
                    <div id="myNav" className="overlayNav" style={widthNavbar}>
                        <Link to={'#'} className="closebtn" onClick={this.handleCloseNav}>&times;</Link>
                        <div className="overlayNav-content">
                            <Link to={'/home'} onClick={this.handleCloseNav}>Home</Link>
                            <Link to={'/Genre'}>Catalogue</Link>
                            <Link to={'/location'}>Location</Link>
                            <Link to={'/Profileuser'} id="profileLogin">Profile</Link>
                            <Link to={'/'} onClick={this.logout} >Logout</Link>
                        </div>
                    </div>

                    <span className="cursor" onClick={this.handleOpenNav}>&#9776;</span>

                    <div className="logo1">
                        <img src={logo} alt="logo library" className="logo" />
                    </div>

                    <Link to={'/Profileuser'} className="akun" id="profileLink">
                        <button type="button" className="btn" id="btnProfile">{user}</button>
                    </Link>
                </div>

            </Fragment>
        )
    }
}

export default Header;