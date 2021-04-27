import React, { Component, Fragment } from 'react'
import NavbarComponent from '../../../../components/Admin/NavbarComponent/NavbarComponent'
import SidebarComponent from '../../../../components/Admin/SidebarComponent/SidebarComponent'
import { connect } from 'react-redux'
import { Container } from 'reactstrap'
import FormCreateAuthor from '../../../../components/Admin/FormComponent/FormCreateAuthor'

class EditAuthor extends Component {
    constructor() {
        super();
        this.state = {
            detailAuthor: {},
            authorId: 0
        }
    }
    componentDidMount() {
        this.setState({
            authorId: this.props.match.params.authorId
        })
        console.log(this.state.authorId);
        this.getDetailAuthor(this.state.authorId);
    }

    getDetailAuthor = (id) => {
        // axios.get('https://605c7cdc6d85de00170da562.mockapi.io/book/' + id)
        //     .then(res => {
        //         this.setState({
        //             detailBook: res.data
        //         })
        //         console.log(this.state.detailBook);
        //     })
    }

    render() {
        const authorId = this.state.authorId;

        return (
            <Fragment>
                <div className="wrapper">
                    <SidebarComponent />
                    <div id="content">
                        <NavbarComponent />

                        <div className="card shadow mb-4">
                            <Container>
                                <h6 className='mt-3'>Edit Author {authorId}</h6>
                                <FormCreateAuthor />
                            </Container>
                        </div>

                    </div>
                </div>
            </Fragment>
        )
    }
}


export default connect()(EditAuthor)
