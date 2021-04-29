import React, { Component, Fragment } from 'react'
import { Row, Col, Container } from 'reactstrap'
import NavbarComponent from '../../../components/Admin/NavbarComponent/NavbarComponent'
import SidebarComponent from '../../../components/Admin/SidebarComponent/SidebarComponent'
import { connect } from 'react-redux'
import axios from 'axios'

class AddBook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            title: "",
            cover: "",
            categoryId: 0,
            publisherId: 0,
            authorId: 0,
            year: 0,
            synopsis: "",
            stock: 0,
            file: null
        }
    }

    inputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    fileChange = async (e) => {
        console.log(e.target.files);
        await this.setState({
            file: e.target.files[0]
        })
        await console.log(this.state.file);
    }

    onSubmitForm = () => {
        const data = new FormData();
        data.append('file', this.state.file);


        axios.post("http://localhost:7070/api/dynteam/book/cover/upload", data)
            .then(function (response) {
                console.log("cover : ");
                console.log(response);
                this.setState({
                    file: null
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {

        const { title, categoryId, publisherId, authorId, year, stock, synopsis } = this.state;
        return (
            <Fragment>
                <div className="wrapper">
                    <SidebarComponent />
                    <div id="content">
                        <NavbarComponent />

                        <div className="card shadow mb-4">
                            <Container>
                                <h6 className='mt-3'>Add Book</h6>
                                <form onSubmit={this.onSubmitForm}>
                                    <Row>
                                        <Col md={12}>
                                            <div className="form-group">
                                                <label htmlFor="title">Title</label>
                                                <input className="form-control" id="title" name="title" value={title} onChange={this.inputChange} />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <div className="form-group">
                                                <label htmlFor="category">Category</label>
                                                <input className="form-control" id="categoryId" name="categoryId" value={categoryId} onChange={this.inputChange} />
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="form-group">
                                                <label htmlFor="publisher">Publisher</label>
                                                <input className="form-control" id="publisherId" name="publisherId" value={publisherId} onChange={this.inputChange} />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <div className="form-group">
                                                <label htmlFor="author">Author</label>
                                                <input className="form-control" id="authorId" name="authorId" value={authorId} onChange={this.inputChange} />
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="form-group">
                                                <label htmlFor="year">Year</label>
                                                <input className="form-control" id="year" name="year" value={year} onChange={this.inputChange} />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <div className="form-group">
                                                <label htmlFor="stock">Stock</label>
                                                <input type="number" className="form-control" id="stock" min="0" step="1" name="stock" value={stock} onChange={this.inputChange} />
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div>
                                                <label htmlFor="cover">Cover</label>
                                                <input
                                                    type='file'
                                                    className='form-control-file'
                                                    id='cover'
                                                    multiple
                                                    onChange={this.fileChange}
                                                    name='file' />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <div className="form-group">
                                                <label htmlFor="synopsis">Synopsis</label>
                                                <textarea className="form-control" id="synopsis" rows="10" name="synopsis" value={synopsis} onChange={this.inputChange} />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <div className="form-group">
                                            <button className="form-control btn btn-primary" type="submit">Add</button>
                                        </div>
                                    </Row>

                                </form>
                            </Container>
                        </div>

                    </div>
                </div>
            </Fragment>
        )
    }
}

export default connect()(AddBook)
