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

    const getCategories = () => {
        const admin = authHeader();
        console.log(admin)

        axios.get('http://localhost:7070/api/dynteam/book/category/all-categories', {
            headers: admin
        })
            .then(res => {
                setData(res.data)
                console.log(data);
            })
    }

    useEffect(async () => {
        await authHeader();
        await getCategories();
    })

    const handleClickActive = (id) => {
        console.log('data ke: ' + id)
        const admin = authHeader();

        const r = window.confirm('Are you sure to inactive this category?')
        if (r == true) {
            axios.delete("http://localhost:7070/api/dynteam/book/category/delete/" + id, {
                headers: admin
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            window.alert('Data category has been inactived!')
            getCategories();
        }
        else {
            window.alert('Data category is safe!')
        }

    }

    const handleClickInactive = (id) => {
        console.log('data ke: ' + id)

        const admin = authHeader();

        const r = window.confirm('Are you sure to active this category?')
        if (r == true) {
            axios.delete("http://localhost:7070/api/dynteam/book/category/actived/" + id, {
                headers: admin
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            window.alert('Data category has been inactived!')
            getCategories();
        }
        else {
            window.alert('Data category is safe!')
        }
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
                window.alert(categoryName + ' data added successfully!')
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
                window.alert(categoryName + ' data updated successfully!')
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const categoryChange = (event) => {
        setCategoryName(event.target.value)
    }

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
                SearchBar
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

export default TableCategory;