import React, { useState, useEffect } from 'react'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Button, Row, Col } from 'reactstrap';
import { faEdit, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import swal from 'sweetalert';
import axios from 'axios';
import { Modal } from 'react-bootstrap'

const { SearchBar } = Search;

const TablePublisher = (props) => {
    const [data, setData] = useState([]);

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

    const getPublishers = () => {
        const admin = authHeader();
        console.log(admin)

        axios.get('http://localhost:7070/api/dynteam/book/publisher/all-publishers', {
            headers: admin
        })
            .then(res => {
                setData(res.data)
                console.log(data);
            })
    }

    useEffect(async () => {
        await authHeader();
        await getPublishers();
    })

    const handleClickActive = (id) => {
        console.log('data ke: ' + id)

        const admin = authHeader();

        const r = window.confirm('Are you sure to inactive this publisher?')
        if (r == true) {
            axios.delete("http://localhost:7070/api/dynteam/book/publisher/delete/" + id, {
                headers: admin
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            window.alert('Data publisher has been inactived!')
            getPublishers();
        }
        else {
            window.alert('Data publisher is safe!')
        }

    }

    const handleClickInactive = (id) => {
        console.log('data ke: ' + id)

        const admin = authHeader();

        const r = window.confirm('Are you sure to active this publisher?')
        if (r == true) {
            axios.delete("http://localhost:7070/api/dynteam/book/publisher/actived/" + id, {
                headers: admin
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            window.alert('Data publisher has been actived!')
            getPublishers();
        }
        else {
            window.alert('Data publisher is safe!')
        }

    }

    const [show, setShow] = useState(false);

    const [eshow, setEshow] = useState(false);

    const getIdPublisher = (id) => {
        const admin = authHeader();

        axios.get('http://localhost:7070/api/dynteam/book/publisher/' + id, {
            headers: admin
        })
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
        const admin = authHeader();

        const publisher = {
            publisherName: publisherName
        }

        axios.post("http://localhost:7070/api/dynteam/book/publisher/insert", publisher, {
            headers: admin
        })
            .then(function (response) {
                window.alert(publisherName + ' data added successfully!')
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const onSubmitE = () => {
        const admin = authHeader();

        const publisher = {
            publisherName: publisherName
        }

        console.log(id);
        console.log(publisher);

        axios.put("http://localhost:7070/api/dynteam/book/publisher/update/" + id, publisher, {
            headers: admin
        })
            .then(function (response) {
                window.alert(publisherName + ' data updated successfully!')
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    const publisherChange = (event) => {
        setPublisherName(event.target.value)
    }

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

    const defaultSorted = [{
        dataField: 'publisherId',
        order: 'asc'
    }];

    return (
        <>
            <ToolkitProvider
                bootstrap4
                keyField="publisherId"
                data={data}
                columns={columns}
                defaultSorted={defaultSorted}
                search
            >
                {
                    props => (
                        <div>
                            <Row>
                                {/* <Col>
                                    <SearchBar {...props.searchProps} placeholder="Search .." />
                                </Col> */}
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
                                                            <input className="form-control" id="publisherName" value={publisherName} onChange={publisherChange} required />
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
                                                            <input className="form-control" id="publisherName" value={publisherName} onChange={publisherChange} required />
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

export default TablePublisher;