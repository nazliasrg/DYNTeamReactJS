import React, { useState, useEffect } from 'react'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Button, Row, Col } from 'reactstrap';
import { faEdit, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import swal from 'sweetalert';
import axios from 'axios'
import { Modal } from 'react-bootstrap'

const TableCategory = (props) => {

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

    const handleClickActive = (id) => {
        console.log('data ke: ' + id)
        swal({
            title: "Are you sure to inactive this category?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                inactivedCategory(id);
                if (willDelete) {
                    swal("Data category has been inactived!", {
                        icon: "success",
                    }).then((OK) => {
                        window.location.reload(false);
                    })

                } else {
                    swal("Data category is safe!");
                }
            });
    }

    const inactivedCategory = (id) => {
        const admin = authHeader();

        axios.delete("http://localhost:7070/api/dynteam/book/category/delete/" + id, {
            headers: admin
        })
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
            title: "Are you sure to active this category?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    activedCategory(id);
                    swal("Data category has been actived!", {
                        icon: "success",
                    }).then((OK) => {
                        window.location.reload(false);
                    })

                } else {
                    swal("Data category is safe!");
                }
            });
    }

    const activedCategory = (id) => {
        const admin = authHeader();

        axios.delete("http://localhost:7070/api/dynteam/book/category/actived/" + id, {
            headers: admin
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const [show, setShow] = useState(false);

    const [eshow, setEshow] = useState(false);

    const getIdCategory = (id) => {
        const admin = authHeader();

        axios.get('http://localhost:7070/api/dynteam/book/category/' + id, {
            headers: admin
        })
            .then(function (response) {
                console.log(response);
                setId(response.data.categoryId)
                setCategoryName(response.data.categoryName)
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

    const [categoryName, setCategoryName] = useState("");

    const [id, setId] = useState(0);

    const onSubmit = () => {
        const admin = authHeader();

        const category = {
            categoryName: categoryName
        }

        axios.post("http://localhost:7070/api/dynteam/book/category/insert", category, {
            headers: admin
        })
            .then(function (response) {
                alert(categoryName + ' data added successfully!')
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const onSubmitE = () => {

        const admin = authHeader();

        const category = {
            categoryName: categoryName
        }

        console.log(id);
        console.log(category);

        axios.put("http://localhost:7070/api/dynteam/book/category/update/" + id, category, {
            headers: admin
        })
            .then(function (response) {
                alert(categoryName + ' data updated successfully!')
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const categoryChange = (event) => {
        setCategoryName(event.target.value)
    }

    const { data } = props;

    const columns = [{
        dataField: 'categoryId',
        text: 'No',
        sort: true,
        headerStyle: () => {
            return { width: '7%' }
        }
    }, {
        dataField: 'categoryCode',
        text: 'Category Code',
        sort: true
    }, {
        dataField: 'categoryName',
        text: 'Category Name',
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
            if (row.categoryStatus === 1) {
                return (
                    <Row className='justify-content-center'>
                        <Button color='primary' className="mr-2" onClick={() => handleClickActive(row.categoryId)}>
                            Active
                        </Button>
                    </Row>
                )
            }
            else {
                return (
                    <Row className='justify-content-center'>
                        <Button color='danger' className="mr-2" onClick={() => handleClickInactive(row.categoryId)}>
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
                    <Button color='warning' className="mr-2 btn-crud" onClick={() => getIdCategory(row.categoryId)}>
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                </Row>
            )
        }
    }];

    const defaultSorted = [{
        dataField: 'categoryId',
        order: 'asc'
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
                                                Add Category
                                        </Button>

                                        {/* modal add */}
                                        <Modal show={show}>
                                            <Modal.Header closeButton onClick={closeModal}>
                                                <Modal.Title>Add Category</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <>
                                                    <form onSubmit={onSubmit}>
                                                        <div className="form-group">
                                                            <label htmlFor="categoryName">Category Name</label>
                                                            <input className="form-control" id="categoryName" value={categoryName} onChange={categoryChange} required />
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
                                                <Modal.Title>Edit Category</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <>
                                                    <form onSubmit={onSubmitE}>
                                                        <div className="form-group">
                                                            <label htmlFor="categoryName">Category Name</label>
                                                            <input className="form-control" id="categoryName" value={categoryName} onChange={categoryChange} required />
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

export default TableCategory;