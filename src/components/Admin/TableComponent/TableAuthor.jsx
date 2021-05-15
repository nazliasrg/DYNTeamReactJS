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

class TableAuthor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            show: false,
            eShow: false,
            id: 0,
            authorName: "",
        }
    }

    async componentDidMount() {
        await this.authHeader();
        await this.getAuthors();
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

    getAuthors = () => {
        const admin = this.authHeader();
        console.log(admin)

        axios.get('http://localhost:7070/api/dynteam/book/author/all-authors', {
            headers: admin
        })
            .then(res => {
                this.setState({
                    data: res.data
                })

                console.log(this.state.data);
            })
    }

    handleClickActive = (id) => {

        console.log('data ke: ' + id)

        const admin = this.authHeader();

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
            this.getAuthors();
        }
        else {
            window.alert('Data author is safe!')
        }
    }

    handleClickInactive = (id) => {

        console.log('data ke: ' + id)

        const admin = this.authHeader();

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
            this.getAuthors();
        }
        else {
            window.alert('Data author is safe!')
        }
    }

    getIdAuthor = (id) => {
        const admin = this.authHeader();

        axios.get('http://localhost:7070/api/dynteam/book/author/' + id, {
            headers: admin
        })
            .then(response => {
                console.log(response);
                this.setState({
                    id: response.data.authorId,
                    authorName: response.data.authorName
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

        const author = {
            authorName: this.state.authorName
        }

        axios.post("http://localhost:7070/api/dynteam/book/author/insert", author, {
            headers: admin
        })
            .then(function (response) {
                window.alert(this.state.authorName + ' author data added successfully!')
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onSubmitE = () => {

        const admin = this.authHeader();

        const author = {
            authorName: this.state.authorName
        }

        console.log(this.state.id);
        console.log(this.author);

        axios.put("http://localhost:7070/api/dynteam/book/author/update/" + this.state.id, author, {
            headers: admin
        })
            .then(function (response) {
                window.alert(this.state.authorName + ' author data updated successfully!')
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    authorChange = (event) => {
        this.setState({
            authorName: event.target.value
        })
    }

    columns = [{
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
                        <Button color='primary' className="mr-2" onClick={() => this.handleClickActive(row.authorId)}>
                            Active
                        </Button>
                    </Row>
                )
            }
            else {
                return (
                    <Row className='justify-content-center'>
                        <Button color='danger' className="mr-2" onClick={() => this.handleClickInactive(row.authorId)}>
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
                    <Button color='warning' className="mr-2 btn-crud" onClick={() => this.getIdAuthor(row.authorId)}>
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                </Row>
            )
        }
    }];

    defaultSorted = [{
        dataField: 'authorId',
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
                                            <Button color='dark' className="mr-2" onClick={this.handleShow}>
                                                <FontAwesomeIcon icon={faPlusCircle} />
                                                Add Author
                                        </Button>

                                            {/* modal add */}
                                            <Modal show={this.state.show}>
                                                <Modal.Header closeButton onClick={this.closeModal}>
                                                    <Modal.Title>Add Author</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <>
                                                        <form onSubmit={this.onSubmit}>
                                                            <div className="form-group">
                                                                <label htmlFor="authorName">Author Name</label>
                                                                <input className="form-control" id="authorName" value={this.state.authorName} onChange={this.authorChange} required />
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
                                                    <Modal.Title>Edit Author</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <>
                                                        <form onSubmit={this.onSubmitE}>
                                                            <div className="form-group">
                                                                <label htmlFor="authorName">Author Name</label>
                                                                <input className="form-control" id="authorName" value={this.state.authorName} onChange={this.authorChange} required />
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


export default TableAuthor;