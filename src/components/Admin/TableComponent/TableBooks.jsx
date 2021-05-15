import React, { Component } from 'react'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Button, Row, Col } from 'reactstrap';
import { faMinus, faPlus, faEdit, faPlusCircle, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap'

const { SearchBar } = Search;

class TableBooks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            show: false,
            addShow: false,
            discShow: false,
            stock: 0,
            addStock: 0,
            bookId: 0,
            synopsis: "",
        }
    }

    async componentDidMount() {
        await this.authHeader();
        await this.getBooks();
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

    handleClick = async (id) => {
        const admin = this.authHeader();

        console.log('data ke: ' + id)

        const r = window.confirm('Are you sure to make this book not available?')
        if (r == true) {
            await axios.delete("http://localhost:7070/api/dynteam/book/delete/" + id, {
                headers: admin
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            await window.alert('Data book has been not available!')
            await this.getBooks();
        }
        else {
            window.alert('Data book is safe!')
        }

    }

    handleClickView = (id) => {

        const admin = this.authHeader();

        this.setState({
            show: true
        })

        console.log('data ke: ' + id)

        axios.get('http://localhost:7070/api/dynteam/book/' + id, {
            headers: admin
        })
            .then(res => {
                console.log(res)
                this.setState({
                    synopsis: res.data.synopsis
                })
            })

    }

    addStockButton = (id) => {

        const admin = this.authHeader();

        this.setState({
            addShow: true
        })

        console.log('data ke: ' + id)
        axios.get('http://localhost:7070/api/dynteam/book/' + id, {
            headers: admin
        })
            .then(res => {
                console.log("res.data.stock")
                console.log(res.data.stock)
                this.setState({
                    stock: res.data.stock,
                    bookId: res.data.bookId
                })
            })
    }

    discrepancyButton = (id) => {
        const admin = this.authHeader();

        this.setState({
            discShow: true
        })

        console.log('data ke: ' + id)

        axios.get('http://localhost:7070/api/dynteam/book/' + id, {
            headers: admin
        })
            .then(res => {
                console.log(res)
                this.setState({
                    stock: res.data.stock,
                    bookId: res.data.bookId
                })
            })
    }

    stockChange = (e) => {
        this.setState({
            addStock: e.target.value
        })
    }

    submitAddStock = (e) => {

        const admin = this.authHeader();

        e.preventDefault();

        axios.put('http://localhost:7070/api/dynteam/book/add/' + this.state.bookId + '/' + this.state.addStock, null, {
            headers: admin
        })
            .then(res => {
                window.alert('Stock was successfully added!')
                this.closeModalAdd();
                this.getBooks();
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    submitDiscStock = () => {
        const admin = this.authHeader();

        axios.put('http://localhost:7070/api/dynteam/book/discrepancy/' + this.state.bookId + '/' + this.state.addStock, null, {
            headers: admin
        })
            .then(res => {
                window.alert('Stock was successfully reduced!')
                this.closeModalDisc();
                this.getBooks();

            })
            .catch(function (error) {
                console.log(error)
            })
    }

    columns = [{
        dataField: 'bookId',
        text: 'No',
        sort: true,
        headerStyle: () => {
            return { width: '7%' }
        }
    }, {
        dataField: 'bookCode',
        text: 'Book Code',
        sort: true
    }, {
        dataField: 'cover',
        text: 'Cover',
        headerStyle: () => {
            return { textAlign: 'center' }
        },
        sort: true,
        formatter: (cell, row) => {
            return (
                <Row className='justify-content-center'>
                    <img src={`http://localhost:7070/api/dynteam/book/cover/download/${row.cover}`} className="img-thumbnail img-book" style={{ width: '60px' }} alt="" />
                </Row>
            )
        }
    }, {
        dataField: 'categoryEntity.categoryName',
        text: 'Category',
        sort: true
    }, {
        dataField: 'title',
        text: 'Title',
        sort: true
    }, {
        dataField: 'authorEntity.authorName',
        text: 'Author',
        sort: true
    }, {
        dataField: 'publisherEntity.publisherName',
        text: 'Publisher',
        sort: true
    }, {
        dataField: 'year',
        text: 'Year',
        sort: true
    }, {
        dataField: 'stock',
        text: 'Stock',
        sort: true,
        headerStyle: () => {
            return { textAlign: 'center' }
        },
        style: {
            textAlign: 'center'
        }
    }, {
        text: 'Synopsis',
        sort: true,
        headerStyle: () => {
            return { textAlign: 'center' }
        },
        formatter: (rowContent, row) => {
            return (
                <>
                    <Row className='justify-content-center'>
                        <Button color='danger' className="mr-2 btn-crud" onClick={() => this.handleClickView(row.bookId)}>
                            <FontAwesomeIcon icon={faEye} />
                        </Button>
                    </Row>
                </>
            )
        }
    }, {
        dataField: 'link',
        text: 'Action',
        headerStyle: () => {
            return { textAlign: 'center' }
        },
        formatter: (rowContent, row) => {
            if (row.isAvailable == 1) {
                return (
                    <>
                        <Row className='justify-content-center'>
                            <Link to={'edit-book/' + row.bookId}>
                                <Button color='warning' className="mr-2 btn-crud">
                                    <FontAwesomeIcon icon={faEdit} />
                                </Button>
                            </Link>
                            <Button color='danger' className="mr-2 btn-crud" onClick={() => this.handleClick(row.bookId)}>
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>
                        </Row>
                        <Row className='justify-content-center mt-2'>
                            <Button color='warning' className="mr-2 btn-crud" onClick={() => this.addStockButton(row.bookId)}>
                                <FontAwesomeIcon icon={faPlus} />
                            </Button>
                            <Button color='warning' className="mr-2 btn-crud" onClick={() => this.discrepancyButton(row.bookId)}>
                                <FontAwesomeIcon icon={faMinus} />
                            </Button>
                        </Row>
                    </>
                )
            }
            else {
                return (
                    <>
                        <Row className='justify-content-center'>
                            <Link to={'edit-book/' + row.bookId}>
                                <Button color='warning' className="mr-2 btn-crud">
                                    <FontAwesomeIcon icon={faEdit} />
                                </Button>
                            </Link>
                        </Row>
                        <Row className='justify-content-center mt-2'>
                            <Button color='warning' className="mr-2 btn-crud" onClick={() => this.addStockButton(row.bookId)}>
                                <FontAwesomeIcon icon={faPlus} />
                            </Button>
                            <Button color='warning' className="mr-2 btn-crud" onClick={() => this.discrepancyButton(row.bookId)}>
                                <FontAwesomeIcon icon={faMinus} />
                            </Button>
                        </Row>
                    </>
                )
            }

        }
    }];

    defaultSorted = [{
        dataField: 'bookId',
        order: 'desc'
    }];

    closeModal = () => {
        this.setState({
            show: false
        })
    };

    closeModalAdd = () => {
        this.setState({
            addShow: false
        })
    };

    closeModalDisc = () => this.setState({
        discShow: false
    })

    closeEmodal = () => {
        this.setState({
            eShow: false
        })
    };

    render() {
        return (
            <>
                <ToolkitProvider
                    bootstrap4
                    keyField='bookId'
                    data={this.state.data}
                    columns={this.columns}
                    defaultSorted={this.defaultSorted}
                    search
                >
                    {
                        props => (
                            <div>
                                <Row>
                                    <Col>
                                        <SearchBar {...props.searchProps} placeholder="Search .." />
                                    </Col>
                                    <Col>
                                        <div className="float-right">
                                            <Link to={'/add-book'}>
                                                <Button color='dark' className="mr-2">
                                                    <FontAwesomeIcon icon={faPlusCircle} />
                                                Add Book
                                        </Button>
                                            </Link>
                                            {/* modal view Synopsis */}
                                            <Modal show={this.state.show}>
                                                <Modal.Header closeButton onClick={this.closeModal}>
                                                    <Modal.Title>Synopsis</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <label>
                                                        {this.state.synopsis}
                                                    </label>
                                                </Modal.Body>
                                            </Modal>

                                            {/* modal add stock */}
                                            <Modal show={this.state.addShow}>
                                                <Modal.Header closeButton onClick={this.closeModalAdd}>
                                                    <Modal.Title>Add Stock</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <form>
                                                        <div className="form-group">
                                                            <label htmlFor="oldStock">Old Saldo</label>
                                                            <input className="form-control" id="stock" value={this.state.stock} readOnly />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="addStock">Add Stock</label>
                                                            <input className="form-control" id="addStock" value={this.state.addStock} onChange={this.stockChange} />
                                                        </div>
                                                        <div className="form-group">
                                                            <button className="form-control btn btn-primary" type="button" onClick={this.submitAddStock}>Add Stock</button>
                                                        </div>
                                                    </form>
                                                </Modal.Body>
                                            </Modal>

                                            {/* modal discrepancy */}
                                            <Modal show={this.state.discShow}>
                                                <Modal.Header closeButton onClick={this.closeModalDisc}>
                                                    <Modal.Title>Discrepancy Stock</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <form onSubmit={this.submitDiscStock}>
                                                        <div className="form-group">
                                                            <label htmlFor="oldStock">Old Saldo</label>
                                                            <input className="form-control" id="stock" value={this.state.stock} readOnly />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="addStock">Discrepancy</label>
                                                            <input className="form-control" id="addStock" value={this.state.addStock} onChange={this.stockChange} />
                                                        </div>
                                                        <div className="form-group">
                                                            <button className="form-control btn btn-primary" type="submit">Discrepancy</button>
                                                        </div>
                                                    </form>
                                                </Modal.Body>
                                            </Modal>

                                        </div>
                                    </Col>
                                </Row>

                                <div className="justify-content-center tableAdmin mt-2">
                                    <BootstrapTable
                                        {...props.baseProps}

                                        pagination={paginationFactory()}
                                    />
                                </div>
                            </div>
                        )
                    }
                </ToolkitProvider>

            </>
        )
    }
}


export default TableBooks;