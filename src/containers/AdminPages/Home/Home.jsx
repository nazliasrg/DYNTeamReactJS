import React, { Component, Fragment } from 'react';
import SidebarComponent from '../../../components/Admin/SidebarComponent/SidebarComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import NavbarComponent from '../../../components/Admin/NavbarComponent/NavbarComponent';
import TableBooks from '../../../components/Admin/TableComponent/TableBooks';
import axios from 'axios'

class Home extends Component {

    constructor() {
        super();
        this.state = {
            data: []
        };
    }

    authHeader = () => {
        const admin = JSON.parse(localStorage.getItem('data_admin'));
        console.log(admin)

        if (admin && admin.data.token) {
            return {
                'authorization': `Bearer ${admin.data.token}`
            }
        }
        else {
            return null;
        }
    }

    async componentDidMount() {
        await this.authHeader();
        await this.getBooks()
    }

    getBooks = () => {
        const admin = this.authHeader();
        console.log(admin);


        axios.get('http://localhost:7070/api/dynteam/book/books', {
            headers: admin
        })
            .then(res => {
                this.setState({
                    data: res.data
                })
                console.log(this.state.data);
            })
    }

    render() {

        return (
            <Fragment>
                <div className="wrapper">
                    <SidebarComponent />
                    <div id="content">
                        <NavbarComponent />
                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <div className="row">
                                    <h6 className="ml-4 font-weight-bold text-dark">Manage Books</h6>
                                </div>
                            </div>
                            <div className="card-body">
                                <TableBooks data={this.state.data} />
                            </div>
                        </div>

                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Home;