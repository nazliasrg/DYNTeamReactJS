import React, { Component } from 'react'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Button, Row, Col } from 'reactstrap';
import { faEdit, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Modal } from 'react-bootstrap'

const { SearchBar } = Search;

class TableCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            show: false,
            eShow: false,
            categoryId: 0,
            categoryName: "",
        }

        this.getIdCategory = this.getIdCategory.bind(this);
    }

    async componentDidMount() {
        await this.authHeader();
        await this.getCategories();
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

    getCategories = () => {
        const admin = this.authHeader();
        console.log(admin)

        axios.get('http://localhost:7070/api/dynteam/book/category/all-categories', {
            headers: admin
        })
            .then(res => {
                this.setState({
                    data: res.data
                })
                console.log(this.state.data);
            })
    }

    handleClickActive = async (id) => {
        console.log('data ke: ' + id)
        const admin = this.authHeader();

        const r = window.confirm('Are you sure to inactive this category?')
        if (r == true) {
            await axios.delete("http://localhost:7070/api/dynteam/book/category/delete/" + id, {
                headers: admin
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            await window.alert('Data category has been inactived!')
            await this.getCategories();
        }
        else {
            window.alert('Data category is safe!')
        }

    }

    handleClickInactive = async (id) => {
        console.log('data ke: ' + id)

        const admin = this.authHeader();

        const r = window.confirm('Are you sure to active this category?')
        if (r == true) {
            await axios.delete("http://localhost:7070/api/dynteam/book/category/actived/" + id, {
                headers: admin
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            await window.alert('Data category has been inactived!')
            await this.getCategories();
        }
        else {
            window.alert('Data category is safe!')
        }
    }

    getIdCategory = (id) => {
        const admin = this.authHeader();

        axios.get('http://localhost:7070/api/dynteam/book/category/' + id, {
            headers: admin
        })
            .then(res => {
                console.log(res.data)
                this.setState({
                    categoryId: res.data.categoryId,
                    categoryName: res.data.categoryName
                })
            })
            .catch(function (error) {
                console.log(error);
            });

        this.handleEshow();
    }

    handleShow = () => {
        this.setState({
            show: true
        })
    };

    handleEshow = () => {
        this.setState({
            eShow: true
        })
    };

    closeModal = () => {
        this.setState({
            show: false
        })
    };

    closeEmodal = () => {
        this.setState({
            eShow: false
        })
    };

    onSubmit = () => {
        const admin = this.authHeader();

        const category = {
            categoryName: this.state.categoryName
        }

        axios.post("http://localhost:7070/api/dynteam/book/category/insert", category, {
            headers: admin
        })
            .then(function (response) {
                window.alert(this.state.categoryName + ' data added successfully!')
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    onSubmitE = () => {

        const admin = this.authHeader();

        const category = {
            categoryName: this.state.categoryName
        }

        console.log(this.state.categoryId);
        console.log(category);

        axios.put("http://localhost:7070/api/dynteam/book/category/update/" + this.state.categoryId, category, {
            headers: admin
        })
            .then(function (response) {
                window.alert(this.state.categoryName + ' data updated successfully!')
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    categoryChange = (event) => {
        this.setState({
            categoryName: event.target.value
        })
    }

    columns = [{
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
                        <Button color='primary' className="mr-2" onClick={() => this.handleClickActive(row.categoryId)}>
                            Active
                        </Button>
                    </Row>
                )
            }
            else {
                return (
                    <Row className='justify-content-center'>
                        <Button color='danger' className="mr-2" onClick={() => this.handleClickInactive(row.categoryId)}>
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
                    <Button color='warning' className="mr-2 btn-crud" onClick={() => this.getIdCategory(row.categoryId)}>
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                </Row>
            )
        }
    }];

    defaultSorted = [{
        dataField: 'categoryId',
        order: 'asc'
    }];

    render() {
        return (
            <>
                <ToolkitProvider
                    bootstrap4
                    keyField="id"
                    data={this.state.data}
                    columns={this.columns}
                    defaultSorted={this.defaultSorted}
                    SearchBar
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
                                            <Button color='dark' className="mr-2" onClick={this.handleShow}>
                                                <FontAwesomeIcon icon={faPlusCircle} />
                                                Add Category
                                        </Button>

                                            {/* modal add */}
                                            <Modal show={this.state.show}>
                                                <Modal.Header closeButton onClick={this.closeModal}>
                                                    <Modal.Title>Add Category</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <>
                                                        <form onSubmit={this.onSubmit}>
                                                            <div className="form-group">
                                                                <label htmlFor="categoryName">Category Name</label>
                                                                <input className="form-control" id="categoryName" value={this.state.categoryName} onChange={this.categoryChange} required />
                                                            </div>
                                                            <div className="form-group">
                                                                <button className="form-control btn btn-primary" type="submit">Add</button>
                                                            </div>
                                                        </form>
                                                    </>
                                                </Modal.Body>
                                            </Modal>

                                            {/* modal edit */}
                                            <Modal show={this.state.eShow}>
                                                <Modal.Header closeButton onClick={this.closeEmodal}>
                                                    <Modal.Title>Edit Category</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <>
                                                        <form onSubmit={this.onSubmitE}>
                                                            <div className="form-group">
                                                                <label htmlFor="categoryName">Category Name</label>
                                                                <input className="form-control" id="categoryName" value={this.state.categoryName} onChange={this.categoryChange} required />
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
}


export default TableCategory;