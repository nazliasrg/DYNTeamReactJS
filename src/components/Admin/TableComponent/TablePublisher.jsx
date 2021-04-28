import React, { useState } from 'react'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Badge, Button, Row, Col } from 'reactstrap';
import { faEdit, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import { Modal } from 'react-bootstrap'

const { SearchBar } = Search;

const handleClickActive = (id) => {
    console.log('data ke: ' + id)
    swal({
        title: "Are you sure to inactive this publisher?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                inactivedPublisher(id);
                swal("Data publisher has been inactived!", {
                    icon: "success",
                }).then((OK) => {
                    window.location.reload(false);
                })

            } else {
                swal("Data publisher is safe!");
            }
        });
}

const inactivedPublisher = (id) => {
    axios.delete("http://localhost:7070/api/dynteam/book/publisher/delete/" + id)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

const handleClickInactive = (id) => {
    console.log('data ke: ' + id)
    swal({
        title: "Are you sure to active this publisher?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            activedCategory(id);
            if (willDelete) {
                swal("Data publisher has been actived!", {
                    icon: "success",
                }).then((OK) => {
                    window.location.reload(false);
                })

            } else {
                swal("Data publisher is safe!");
            }
        });
}

const activedCategory = (id) => {
    axios.put("http://localhost:7070/api/dynteam/book/publisher/actived/" + id)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

const defaultSorted = [{
    dataField: 'id',
    order: 'asc'
}];

const TablePublisher = (props) => {
    const [show, setShow] = useState(false);

    const [eshow, setEshow] = useState(false);

    const getIdPublisher = (id) => {
        axios.get('http://localhost:7070/api/dynteam/book/publisher/' + id)
            .then(function (response) {
                console.log(response);
                setId(response.data.publisherId)
                setPublisherName(response.data.publisherName)
            })
            .catch(function (error) {
                console.log(error);
            });

        handleEshow();
    }

    const handleShow = () => setShow(true);

    const handleEshow = () => setEshow(true);

    const closeModal = () => setShow(false);

    const closeEmodal = () => setEshow(false);

    const [publisherName, setPublisherName] = useState("");

    const [id, setId] = useState(0);


    const onSubmit = () => {

        const publisher = {
            publisherName: publisherName
        }

        axios.post("http://localhost:7070/api/dynteam/book/publisher/insert", publisher)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const onSubmitE = () => {

        const publisher = {
            publisherName: publisherName
        }

        console.log(id);
        console.log(publisher);

        axios.put("http://localhost:7070/api/dynteam/book/publisher/update/" + id, publisher)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const publisherChange = (event) => {
        setPublisherName(event.target.value)
    }

    const { data } = props;

    const columns = [{
        dataField: 'publisherId',
        text: 'No',
        sort: true,
        headerStyle: () => {
            return { width: '7%' }
        }
    }, {
        dataField: 'publisherCode',
        text: 'Publisher Code',
        sort: true
    }, {
        dataField: 'publisherName',
        text: 'Publisher Name',
        sort: true
    }, {
        dataField: 'link',
        text: 'Status',
        headerStyle: () => {
            return {
                textAlign: 'center'
            }
        },
        formatter: (rowContent, row) => {
            if (row.publisherStatus === 1) {
                return (
                    <Row className='justify-content-center'>
                        <Button color='primary' className="mr-2" onClick={() => handleClickActive(row.publisherId)}>
                            Active
                        </Button>
                    </Row>
                )
            }
            else {
                return (
                    <Row className='justify-content-center'>
                        <Button color='danger' className="mr-2" onClick={() => handleClickInactive(row.publisherId)}>
                            Inactive
                        </Button>
                    </Row>
                )
            }
        }
    }, {
        dataField: 'link',
        text: 'Action',
        headerStyle: () => {
            return { textAlign: 'center' }
        },
        formatter: (rowContent, row) => {
            return (
                <Row className='justify-content-center'>
                    <Button color='warning' className="mr-2 btn-crud" onClick={() => getIdPublisher(row.publisherId)}>
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                </Row>
            )
        }
    }];

    return (
        <>
            <ToolkitProvider
                bootstrap4
                keyField="id"
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
                                        <Button color='dark' className="mr-2" onClick={handleShow}>
                                            <FontAwesomeIcon icon={faPlusCircle} />Add Publisher</Button>

                                        {/* modal add */}
                                        <Modal show={show}>
                                            <Modal.Header closeButton onClick={closeModal}>
                                                <Modal.Title>Add Publisher</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <>
                                                    <form onSubmit={onSubmit}>
                                                        <div className="form-group">
                                                            <label htmlFor="publisherName">Publisher Name</label>
                                                            <input className="form-control" id="publisherName" value={publisherName} onChange={publisherChange} />
                                                        </div>
                                                        <div className="form-group">
                                                            <button className="form-control btn btn-primary" type="submit">Add</button>
                                                        </div>
                                                    </form>
                                                </>
                                            </Modal.Body>
                                        </Modal>

                                        {/* modal edit */}
                                        <Modal show={eshow}>
                                            <Modal.Header closeButton onClick={closeEmodal}>
                                                <Modal.Title>Edit Publisher</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <>
                                                    <form onSubmit={onSubmitE}>
                                                        <div className="form-group">
                                                            <label htmlFor="publisherName">Publisher Name</label>
                                                            <input className="form-control" id="publisherName" value={publisherName} onChange={publisherChange} />
                                                        </div>
                                                        <div className="form-group">
                                                            <button className="form-control btn btn-primary" type="submit">Edit</button>
                                                        </div>
                                                    </form>
                                                </>
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

export default TablePublisher;