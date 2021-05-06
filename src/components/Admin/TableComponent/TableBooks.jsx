import { faMinus, faPlus, faEdit, faPlusCircle, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Row, Col } from 'reactstrap';
import { React, useState, useEffect } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import { Link } from 'react-router-dom';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Modal } from 'react-bootstrap'
import axios from 'axios'


const TableBooks = (props) => {

    const { SearchBar } = Search;

    const authHeader = () => {
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

    useEffect(() => {
        authHeader();
    })

    const admin = authHeader();

    const [show, setShow] = useState(false);

    const [addShow, setAddShow] = useState(false);

    const [discShow, setDiscShow] = useState(false);

    const [stock, setStock] = useState(0);

    const [addStock, setAddStock] = useState(0);

    const [bookId, setBookId] = useState(0);

    const [synopsis, setSynopsis] = useState("");

    const closeModal = () => setShow(false)

    const closeModalAdd = () => setAddShow(false)

    const closeModalDisc = () => setDiscShow(false)

    const handleClick = (id) => {
        console.log('data ke: ' + id)

        const r = window.confirm('Are you sure to make this book not available?')
        if (r == true) {
            axios.delete("http://localhost:7070/api/dynteam/book/delete/" + id, {
                headers: admin
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            window.alert('Data book has been not available!')
            window.location.reload(false);
        }
        else {
            window.alert('Data book is safe!')
        }

    }

    const handleClickView = (id) => {

        setShow(true)
        console.log('data ke: ' + id)

        axios.get('http://localhost:7070/api/dynteam/book/' + id, {
            headers: admin
        })
            .then(res => {
                console.log(res)
                setSynopsis(res.data.synopsis)
            })

    }

    const addStockButton = (id) => {

        setAddShow(true)
        console.log('data ke: ' + id)
        axios.get('http://localhost:7070/api/dynteam/book/' + id, {
            headers: admin
        })
            .then(res => {
                console.log("res.data.stock")
                console.log(res.data.stock)
                setStock(res.data.stock)
                setBookId(res.data.bookId)

            })


    }

    const discrepancyButton = (id) => {

        setDiscShow(true)
        console.log('data ke: ' + id)

        axios.get('http://localhost:7070/api/dynteam/book/' + id, {
            headers: admin
        })
            .then(res => {
                console.log(res)
                setStock(res.data.stock)
                setBookId(res.data.bookId)
            })
    }

    const stockChange = (e) => {
        setAddStock(e.target.value)
    }

    const submitAddStock = (e) => {
        e.preventDefault();

        axios.put('http://localhost:7070/api/dynteam/book/add/' + bookId + '/' + addStock, null, {
            headers: admin
        })
            .then(res => {
                window.alert('Stock was successfully added!')
                window.location.reload(false);
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    const submitDiscStock = () => {

        axios.put('http://localhost:7070/api/dynteam/book/discrepancy/' + bookId + '/' + addStock, null, {
            headers: admin
        })
            .then(res => {
                window.alert('Stock has been reduced!')
                window.location.reload(false);
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    const { data } = props;

    const columns = [{
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
                        <Button color='danger' className="mr-2 btn-crud" onClick={() => handleClickView(row.bookId)}>
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
                            <Button color='danger' className="mr-2 btn-crud" onClick={() => handleClick(row.bookId)}>
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>
                        </Row>
                        <Row className='justify-content-center mt-2'>
                            <Button color='warning' className="mr-2 btn-crud" onClick={() => addStockButton(row.bookId)}>
                                <FontAwesomeIcon icon={faPlus} />
                            </Button>
                            <Button color='warning' className="mr-2 btn-crud" onClick={() => discrepancyButton(row.bookId)}>
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
                            <Button color='warning' className="mr-2 btn-crud" onClick={() => addStockButton(row.bookId)}>
                                <FontAwesomeIcon icon={faPlus} />
                            </Button>
                            <Button color='warning' className="mr-2 btn-crud" onClick={() => discrepancyButton(row.bookId)}>
                                <FontAwesomeIcon icon={faMinus} />
                            </Button>
                        </Row>
                    </>
                )
            }

        }
    }];

    const defaultSorted = [{
        dataField: 'bookId',
        order: 'asc'
    }];

    return (
        <>
            <ToolkitProvider
                bootstrap4
                keyField='id'
                data={data}
                columns={columns}
                defaultSorted={defaultSorted}
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
                                        <Modal show={show}>
                                            <Modal.Header closeButton onClick={closeModal}>
                                                <Modal.Title>Synopsis</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <label>
                                                    {synopsis}
                                                </label>
                                            </Modal.Body>
                                        </Modal>

                                        {/* modal add stock */}
                                        <Modal show={addShow}>
                                            <Modal.Header closeButton onClick={closeModalAdd}>
                                                <Modal.Title>Add Stock</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <form>
                                                    <div className="form-group">
                                                        <label htmlFor="oldStock">Old Saldo</label>
                                                        <input className="form-control" id="stock" value={stock} readOnly />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="addStock">Add Stock</label>
                                                        <input className="form-control" id="addStock" value={addStock} onChange={stockChange} />
                                                    </div>
                                                    <div className="form-group">
                                                        <button className="form-control btn btn-primary" type="button" onClick={submitAddStock}>Add Stock</button>
                                                    </div>
                                                </form>
                                            </Modal.Body>
                                        </Modal>

                                        {/* modal discrepancy */}
                                        <Modal show={discShow}>
                                            <Modal.Header closeButton onClick={closeModalDisc}>
                                                <Modal.Title>Discrepancy Stock</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <form onSubmit={submitDiscStock}>
                                                    <div className="form-group">
                                                        <label htmlFor="oldStock">Old Saldo</label>
                                                        <input className="form-control" id="stock" value={stock} readOnly />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="addStock">Discrepancy</label>
                                                        <input className="form-control" id="addStock" value={addStock} onChange={stockChange} />
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

                            <div className="justify-content-center tableAdmin">
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

export default TableBooks;
