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
import 'bootstrap/dist/css/bootstrap.min.css'
import { Modal } from 'react-bootstrap'

const { SearchBar } = Search;

const TableAuthor = (props) => {
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

    const getAuthors = () => {
        const admin = authHeader();
        console.log(admin)

        axios.get('http://localhost:7070/api/dynteam/book/author/all-authors', {
            headers: admin
        })
            .then(res => {
                setData(res.data)

                console.log(data);
            })
    }

    useEffect(async () => {
        await authHeader();
        await getAuthors();
    })

    const handleClickActive = (id) => {

        console.log('data ke: ' + id)

        const admin = authHeader();

        const r = window.confirm('Are you sure to inactive this author?')
        if (r == true) {
            axios.delete("http://localhost:7070/api/dynteam/book/author/delete/" + id, {
                headers: admin
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            window.alert('Data author has been inactived!')
            getAuthors();
        }
        else {
            window.alert('Data author is safe!')
        }
    }

    const handleClickInactive = (id) => {

        console.log('data ke: ' + id)

        const admin = authHeader();

        const r = window.confirm('Are you sure to active this author?')
        if (r == true) {
            axios.delete("http://localhost:7070/api/dynteam/book/author/actived/" + id, {
                headers: admin
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            window.alert('Data author has been actived!')
            getAuthors();
        }
        else {
            window.alert('Data author is safe!')
        }
    }

    const defaultSorted = [{
        dataField: 'authorId',
        order: 'asc'
    }];

    const admin = authHeader();

    const [show, setShow] = useState(false);

    const [eshow, setEshow] = useState(false);

    const getIdAuthor = (id) => {
        axios.get('http://localhost:7070/api/dynteam/book/author/' + id, {
            headers: admin
        })
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

        axios.post("http://localhost:7070/api/dynteam/book/author/insert", author, {
            headers: admin
        })
            .then(function (response) {
                window.alert(authorName + ' author data added successfully!')
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

        axios.put("http://localhost:7070/api/dynteam/book/author/update/" + id, author, {
            headers: admin
        })
            .then(function (response) {
                window.alert(authorName + ' author data updated successfully!')
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const authorChange = (event) => {
        setAuthorName(event.target.value)
    }

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
                    <Button color='warning' className="mr-2 btn-crud" onClick={() => getIdAuthor(row.authorId)}>
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
                                                            <input className="form-control" id="authorName" value={authorName} onChange={authorChange} required />
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
                                                            <input className="form-control" id="authorName" value={authorName} onChange={authorChange} required />
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