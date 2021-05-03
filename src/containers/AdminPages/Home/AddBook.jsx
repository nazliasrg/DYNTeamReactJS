import React, { Component, Fragment } from 'react'
import { Row, Col, Container } from 'reactstrap'
import NavbarComponent from '../../../components/Admin/NavbarComponent/NavbarComponent'
import SidebarComponent from '../../../components/Admin/SidebarComponent/SidebarComponent'
import axios from 'axios'

class AddBook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            title: "",
            cover: "",
            categoryId: 1,
            publisherId: 1,
            authorId: 1,
            year: 0,
            synopsis: "",
            stock: 0,
            file: null,
            namafile: "",
            author: [],
            category: [],
            publisher: []
        }
    }

    componentDidMount() {
        this.getAllAuthors()
        this.getAllCategories()
        this.getAllPublishers()
    }

    getAllAuthors = () => {
        axios.get('http://localhost:7070/api/dynteam/book/author/authors')
            .then(res => {
                this.setState({
                    author: res.data
                })
                console.log("authors : ")
                console.log(this.state.author)
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    getAllCategories = () => {
        axios.get('http://localhost:7070/api/dynteam/book/category/categories')
            .then(res => {
                this.setState({
                    category: res.data
                })
                console.log("categories : ")
                console.log(this.state.category)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    getAllPublishers = () => {
        axios.get('http://localhost:7070/api/dynteam/book/publisher/publishers')
            .then(res => {
                this.setState({
                    publisher: res.data
                })
                console.log("publishers : ")
                console.log(this.state.publisher)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    inputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    categoryChange = (event) => {
        if (event.detail === 0) {
            console.log("category terpilih : ")
            console.log(event.target.value)
            this.setState({
                categoryId: event.target.value
            })
        }
    }

    publisherChange = (event) => {
        if (event.detail === 0) {
            console.log("publisher terpilih : ")
            console.log(event.target.value)
            this.setState({
                publisherId: event.target.value
            })
        }
    }

    authorChange = (event) => {
        if (event.detail === 0) {
            console.log("author terpilih : ")
            console.log(event.target.value)
            this.setState({
                authorId: event.target.value
            })
        }
    }

    fileChange = async (e) => {
        console.log(e.target.files);
        await this.setState({
            file: e.target.files[0]
        })
        await console.log(this.state.file);
    }

    onSubmitForm = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('file', this.state.file);

        console.log(data)

        axios.post('http://localhost:7070/api/dynteam/book/cover/upload', data)
            .then(res => {
                console.log("cover : ");
                console.log(res);
                this.setState({
                    file: null
                })
                this.insertBook(res);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    insertBook = (res) => {
        const book = {
            title: this.state.title,
            categoryId: this.state.categoryId,
            publisherId: this.state.publisherId,
            authorId: this.state.authorId,
            year: this.state.year,
            synopsis: this.state.synopsis,
            stock: this.state.stock
        }

        this.setState({
            namafile: res.data
        })
        console.log("file")
        console.log(this.state.namafile)

        console.log("data buku : ")
        console.log(book)

        axios.post('http://localhost:7070/api/dynteam/book/insert/' + this.state.namafile, book)
            .then(res => {
                console.log("hasil insert book : ")
                console.log(res)
                alert('Data buku \"' + res.data.data.title + '\" berhasil dimasukkan');
                this.props.history.push({
                    pathname: '/home-admin'
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {

        const { author, category, publisher, title, categoryId, publisherId, authorId, year, stock, synopsis } = this.state;
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
                                                <input className="form-control" id="title" name="title" value={title} onChange={this.inputChange} required />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <div className="form-group">
                                                <label htmlFor="categoryId">Category</label><br />
                                                <select class="form-control" name="categoryId" id="categoryId" onClick={this.categoryChange} required>
                                                    {
                                                        category.map(categoryVal => {
                                                            return (
                                                                <option value={categoryVal.categoryId}>{categoryVal.categoryName}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="form-group">
                                                <label htmlFor="publisherId">Publisher</label><br />
                                                <select class="form-control" name="publisherId" id="publisherId" onClick={this.publisherChange} required>
                                                    {
                                                        publisher.map(publisherVal => {
                                                            return (
                                                                <option value={publisherVal.publisherId}>{publisherVal.publisherName}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <div className="form-group">
                                                <label htmlFor="authorId">Author</label><br />
                                                <select class="form-control" name="authorId" id="authorId" onClick={this.authorChange} required>
                                                    {
                                                        author.map(authorVal => {
                                                            return (
                                                                <option value={authorVal.authorId}>{authorVal.authorName}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="form-group">
                                                <label htmlFor="year">Year</label>
                                                <input className="form-control" id="year" name="year" value={year} onChange={this.inputChange} required />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <div className="form-group">
                                                <label htmlFor="stock">Stock</label>
                                                <input type="number" className="form-control" id="stock" min="0" step="1" name="stock" value={stock} onChange={this.inputChange} required />
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div>
                                                <label htmlFor="cover">Cover</label>
                                                <input
                                                    type='file'
                                                    className='form-control-file'
                                                    id='cover'
                                                    onChange={this.fileChange}
                                                    name='file'
                                                    required />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <div className="form-group">
                                                <label htmlFor="synopsis">Synopsis</label>
                                                <textarea className="form-control" id="synopsis" rows="10" name="synopsis" value={synopsis} onChange={this.inputChange} required />
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

export default AddBook;
