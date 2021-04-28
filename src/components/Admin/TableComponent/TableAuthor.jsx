import React, { useState } from 'react'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Button, Row, Col } from 'reactstrap';
import { faEdit, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Modal } from 'react-bootstrap'

const { SearchBar } = Search;

const handleClickActive = (id) => {
    console.log('data ke: ' + id)
    swal({
        title: "Are you sure to inactive this author?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            inactivedAuthor(id);
            if (willDelete) {
                swal("Data author has been inactived!", {
                    icon: "success",
                }).then((OK) => {
                    window.location.reload(false);
                })

            } else {
                swal("Data author is safe!");
            }
        });
}

const inactivedAuthor = (id) => {
    axios.delete("http://localhost:7070/api/dynteam/book/author/delete/" + id)
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
        title: "Are you sure to active this author?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            activedAuthor(id);
            if (willDelete) {
                swal("Data author has been actived!", {
                    icon: "success",
                }).then((OK) => {
                    window.location.reload(false);
                })

            } else {
                swal("Data author is safe!");
            }
        });
}

const activedAuthor = (id) => {
    axios.put("http://localhost:7070/api/dynteam/book/author/actived/" + id)
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

const TableAuthor = (props) => {

    const [show, setShow] = useState(false);

    const [eshow, setEshow] = useState(false);

    const getIdAuthor = (id) => {
        axios.get('http://localhost:7070/api/dynteam/book/author/' + id)
            .then(function (response) {
                console.log(response);
                setId(response.data.authorId)
                setAuthorName(response.data.authorName)
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

    const [authorName, setAuthorName] = useState("");

    const [id, setId] = useState(0);

    const onSubmit = () => {

        const author = {
            authorName: authorName
        }

        axios.post("http://localhost:7070/api/dynteam/book/author/insert", author)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const onSubmitE = () => {

        const author = {
            authorName: authorName
        }

        console.log(id);
        console.log(author);

        axios.put("http://localhost:7070/api/dynteam/book/author/update/" + id, author)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const authorChange = (event) => {
        setAuthorName(event.target.value)
    }

    const { data } = props;

    const columns = [{
        dataField: 'authorId',
        text: 'No',
        sort: true,
        headerStyle: () => {
            return { width: '7%' }
        }
    }, {
        dataField: 'authorCode',
        text: 'Author Code',
        sort: true
    }, {
        dataField: 'authorName',
        text: 'Author Name',
        sort: true
    },
    {
        dataField: 'link',
        text: 'Status',
        headerStyle: () => {
            return {
                textAlign: 'center'
            }
        },
        formatter: (rowContent, row) => {
            if (row.statusAuthor === 1) {
                return (
                    <Row className='justify-content-center'>
                        <Button color='primary' className="mr-2" onClick={() => handleClickActive(row.authorId)}>
                            Active
                        </Button>
                    </Row>
                )
            }
            else {
                return (
                    <Row className='justify-content-center'>
                        <Button color='danger' className="mr-2" onClick={() => handleClickInactive(row.authorId)}>
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
                    {/* <Link to={'edit-author/' + row.authorId}> */}
                    <Button color='warning' className="mr-2 btn-crud" onClick={() => getIdAuthor(row.authorId)}>
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    {/* </Link> */}
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
                                            <FontAwesomeIcon icon={faPlusCircle} />
                                                Add Author
                                        </Button>

                                        {/* modal add */}
                                        <Modal show={show}>
                                            <Modal.Header closeButton onClick={closeModal}>
                                                <Modal.Title>Add Author</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <>
                                                    <form onSubmit={onSubmit}>
                                                        <div className="form-group">
                                                            <label htmlFor="authorName">Author Name</label>
                                                            <input className="form-control" id="authorName" value={authorName} onChange={authorChange} />
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
                                                <Modal.Title>Edit Author</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <>
                                                    <form onSubmit={onSubmitE}>
                                                        <div className="form-group">
                                                            <label htmlFor="authorName">Author Name</label>
                                                            <input className="form-control" id="authorName" value={authorName} onChange={authorChange} />
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


export default TableAuthor;