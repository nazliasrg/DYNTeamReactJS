import React, { Component, Fragment } from 'react'
import NavbarComponent from '../../../components/Admin/NavbarComponent/NavbarComponent'
import SidebarComponent from '../../../components/Admin/SidebarComponent/SidebarComponent'
import { Row, Col, Container } from 'reactstrap'
import axios from 'axios'
import { reset } from 'redux-form'

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
            cover: "",
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
        await console.log("id: ")
        await console.log(this.props.match.params.no)
        await this.getBookById(this.props.match.params.no)
        await this.getAllAuthors()
        await this.getAllCategories()
        await this.getAllPublishers()
    }

    getBookById = (id) => {
        const admin = this.authHeader();

        axios.get('http://localhost:7070/api/dynteam/book/' + id, {
            headers: admin
        })
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
                    cover: res.data.cover,
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
        const admin = this.authHeader();

        axios.get('http://localhost:7070/api/dynteam/book/author/authors', {
            headers: admin
        })
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
        const admin = this.authHeader();

        axios.get('http://localhost:7070/api/dynteam/book/category/categories', {
            headers: admin
        })
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
        const admin = this.authHeader();

        axios.get('http://localhost:7070/api/dynteam/book/publisher/publishers', {
            headers: admin
        })
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

    fileChange = async (e) => {
        console.log("e.target.files");
        console.log(e.target.files);
        await this.setState({
            file: e.target.files[0],
            cover: e.target.files[0].name
        })
        await this.uploadCover();
        await console.log(this.state.file);

    }

    uploadCover = () => {
        const admin = this.authHeader();
        const data = new FormData();
        data.append('file', this.state.file);

        console.log(data)

        axios.post('http://localhost:7070/api/dynteam/book/cover/upload', data, {
            headers: admin
        })
            .then(res => {
                console.log("cover : ");
                console.log(res.data);
                this.setState({
                    file: null,
                    cover: res.data
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onSubmitForm = (e) => {
        e.preventDefault();
        const admin = this.authHeader();
        this.editBook(this.state.cover, admin);
    }

    editBook = (res, admin) => {
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

        axios.put('http://localhost:7070/api/dynteam/book/update/' + this.state.id + '/' + res, book, {
            headers: admin
        })
            .then(res => {
                console.log("hasil update book : ")
                console.log(res)
                alert('Book \"' + res.data.data.title + '\" has been updated!');
                this.props.history.push({
                    pathname: '/home-admin'
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        const { authorList, categoryList, publisherList, title, categoryId, publisherId, authorId, year, synopsis, file, cover } = this.state;

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
                                        <Col md={3}>
                                            <img src={`http://localhost:7070/api/dynteam/book/cover/download/${cover}`} className="img-thumbnail" />
                                        </Col>
                                        <Col md={6}>
                                            <div>
                                                <label htmlFor="cover">Cover</label>
                                                <input
                                                    type='file'
                                                    className='form-control-file'
                                                    id='cover'
                                                    src={file}
                                                    onChange={this.fileChange}
                                                    name='file' />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <div className="form-group mt-3 ml-3">
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
