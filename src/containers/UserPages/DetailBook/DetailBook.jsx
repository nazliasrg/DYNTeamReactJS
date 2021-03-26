import React, { Component, Fragment } from 'react'
import axios from 'axios'
import Header from '../../../components/User/Header/Header';
import { Container, Button, Card, Row, Col } from 'reactstrap';
import Modal from "react-bootstrap/Modal";
import swal from 'sweetalert';

class DetailBook extends Component {
    constructor() {
        super();
        this.state = {
            detailBook: {},
            show: false,
        }
    }

    componentDidMount() {
        const bookId = this.props.match.params.bookId
        console.log(bookId);
        this.getDetailBook(bookId)
    }

    getDetailBook = (id) => {
        axios.get('https://605c7cdc6d85de00170da562.mockapi.io/book/' + id)
            .then(res => {
                this.setState({
                    detailBook: res.data
                })
                console.log(this.state.detailBook);
            })
    }

    handleClose = () => {
        this.setState({
            show: false
        });
    }

    handleShow = () => {
        this.setState({
            show: true
        });
    }

    swalRent = () => {
        swal("Book Rent!", "wait for confirmation from admin", "success")
            .then((value) => {
                const { history } = this.props;
                history.push('/Profileuser');
            });
    }

    render() {
        const { id_book, category, title, author, publisher, year, stock, synopsis } = this.state.detailBook;

        return (
            <Fragment>
                <Header />
                <Container style={{ marginTop: "100px" }}>
                    <div className="row justify-content-center">
                        <h1 className="m-2 pageTitle">D&nbsp;E&nbsp;T&nbsp;A&nbsp;I&nbsp;L &nbsp;&nbsp; B&nbsp;O&nbsp;O&nbsp;K </h1>
                    </div>
                    <Card style={{ backgroundColor: "#f0f0f0" }}>
                        <div className="mid-container ps-2 mx-5 my-5">
                            <div className="row justify-content-end">
                                <div className="col-md-2 mt-3">
                                    <Button className="btn btn-warning" style={{ width: "100%" }} onClick={this.handleShow}>RENT</Button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xl-4">
                                    <div className="row">
                                        <img className="img-thumbnail picModal" id="pic" src={`../img/book/${id_book}.jpg`} alt="" />
                                    </div>
                                </div>
                                <div className="col-xl-8 mt-4">
                                    <div className="row">
                                        <div className="col-md-10">
                                            <label className="fw-bold" for="title">Title</label>
                                            <h3 className="fw-bold">{title}</h3>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center mt-5">
                                        <div className="col-md-6">
                                            <label className="fw-bold" for="category">Category</label>
                                            <p id="category" style={{ fontSize: "18px" }}>{category}</p>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="fw-bold" for="year">Year</label>
                                            <p id="year" style={{ fontSize: "18px" }}>{year}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label className="fw-bold" for="stock">Available</label>
                                            <p id="stock" style={{ fontSize: "14px" }}>{stock}</p>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="fw-bold" for="id_book">Book code</label>
                                            <p id="id_book" style={{ fontSize: "14px" }}>{id_book}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label className="fw-bold" for="writer">Author</label>
                                            <p id="author" style={{ fontSize: "14px" }}>{author}</p>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="fw-bold" for="publisher">Publisher</label>
                                            <p id="publisher" style={{ fontSize: "14px" }}>{publisher}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label className="fw-bold" for="synopsis">Synopsis</label>
                                            <p id="synopsis" style={{ textAlign: 'justify' }}>{synopsis}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>RENT FORM</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form action="">
                                <Row className="justify-content-center my-2">
                                    <Col md={8}>
                                        <label for="price" className="form-label">Duration</label><br />
                                        <select className="form-select" style={{ width: "100%" }}>
                                            <option selected>Choose Duration</option>
                                            <option value="1">3 Days</option>
                                            <option value="2">7 Days</option>
                                        </select>
                                    </Col>
                                </Row>
                                <Row className="justify-content-center my-2">
                                    <Col md={8}>
                                        <label for="price" className="form-label">Cost</label><br />
                                        <input type="text" className="form-control" id="price" value="Rp 10.000" readonly />
                                    </Col>
                                </Row>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>

                            <Button color="primary" onClick={this.swalRent}>RENT</Button>
                        </Modal.Footer>
                    </Modal>

                </Container>
            </Fragment>

        )
    }
}

export default DetailBook;
