import React, { Component, Fragment } from 'react'
import NavbarComponent from '../../../components/Admin/NavbarComponent/NavbarComponent'
import SidebarComponent from '../../../components/Admin/SidebarComponent/SidebarComponent'
import { Row, Col, Container } from 'reactstrap'
import axios from 'axios'

class EditBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            id: 0,
            title: "",
            cover: "",
            categoryId: 1,
            publisherId: 1,
            authorId: 1,
            year: 0,
            synopsis: "",
            file: null,
            namafile: "",
            authorList: [],
            categoryList: [],
            publisherList: [],
            author: "",
            category: "",
            publisher: ""
        }
    }

    componentDidMount() {
        console.log("id: ")
        console.log(this.props.match.params.no)
        this.getBookById(this.props.match.params.no)
        this.getAllAuthors()
        this.getAllCategories()
        this.getAllPublishers()
    }

    getBookById = (id) => {
        axios.get('http://localhost:7070/api/dynteam/book/' + id)
            .then(res => {
                console.log("data book by id")
                console.log(res)
                this.setState({
                    id: res.data.bookId,
                    title: res.data.title,
                    category: res.data.categoryEntity.categoryName,
                    categoryId: res.data.categoryEntity.categoryId,
                    publisher: res.data.publisherEntity.publisherName,
                    publisherId: res.data.publisherEntity.publisherId,
                    author: res.data.authorEntity.authorName,
                    authorId: res.data.authorEntity.authorId,
                    year: res.data.year,
                    synopsis: res.data.synopsis,
                    file: "http://localhost:7070/api/dynteam/book/cover/download/" + res.data.cover
                })
                console.log("cover")
                console.log(this.state.file)
                console.log("publisher")
                console.log(this.state.publisherId)
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    getAllAuthors = () => {
        axios.get('http://localhost:7070/api/dynteam/book/author/authors')
            .then(res => {
                this.setState({
                    authorList: res.data
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
                    categoryList: res.data
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
                    publisherList: res.data
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

    onSubmitForm = (e) => {
        e.preventDefault();

        const book = {
            title: this.state.title,
            categoryId: this.state.categoryId,
            publisherId: this.state.publisherId,
            authorId: this.state.authorId,
            year: this.state.year,
            synopsis: this.state.synopsis,
            stock: this.state.stock
        }

        console.log("id")
        console.log(this.state.id)

        console.log("data buku : ")
        console.log(book)

        axios.put('http://localhost:7070/api/dynteam/book/update/' + this.state.id, book)
            .then(res => {
                console.log("hasil update book : ")
                console.log(res)
                alert('Data buku \"' + res.data.data.title + '\" berhasil diperbaharui');
                this.props.history.push({
                    pathname: '/home-admin'
                })
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    render() {
        const { authorList, categoryList, publisherList, title, categoryId, publisherId, authorId, year, synopsis } = this.state;

        return (
            <Fragment>
                <div className="wrapper">
                    <SidebarComponent />
                    <div id="content">
                        <NavbarComponent />

                        <div className="card shadow mb-4">
                            <Container>
                                <h6 className='mt-3'>Edit Book</h6>
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
                                                <select class="form-control" name="categoryId" id="categoryId" onClick={this.categoryChange} required >
                                                    {
                                                        categoryList.map(categoryVal => {
                                                            if (categoryVal.categoryId == categoryId) {
                                                                return (
                                                                    <option selected value={categoryVal.categoryId}>{categoryVal.categoryName}</option>
                                                                )
                                                            }
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
                                                        publisherList.map(publisherVal => {
                                                            if (publisherVal.publisherId == publisherId) {
                                                                return (
                                                                    <option selected value={publisherVal.publisherId}>{publisherVal.publisherName}</option>
                                                                )
                                                            }
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
                                                        authorList.map(authorVal => {
                                                            if (authorVal.authorId == authorId) {
                                                                return (
                                                                    <option selected value={authorVal.authorId}>{authorVal.authorName}</option>
                                                                )
                                                            }
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
                                        <Col md={12}>
                                            <div className="form-group">
                                                <label htmlFor="synopsis">Synopsis</label>
                                                <textarea className="form-control" id="synopsis" rows="10" name="synopsis" value={synopsis} onChange={this.inputChange} required />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <div className="form-group">
                                            <button className="form-control btn btn-primary" type="submit">Edit</button>
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

export default EditBook;
