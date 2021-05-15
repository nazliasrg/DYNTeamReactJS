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

class TablePublisher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            show: false,
            eShow: false,
            publisherId: 0,
            publisherName: "",
        }

    }

    async componentDidMount() {
        await this.authHeader();
        await this.getPublishers();
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

    getPublishers = () => {
        const admin = this.authHeader();
        console.log(admin)

        axios.get('http://localhost:7070/api/dynteam/book/publisher/all-publishers', {
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

        const r = window.confirm('Are you sure to inactive this publisher?')
        if (r == true) {
            await axios.delete("http://localhost:7070/api/dynteam/book/publisher/delete/" + id, {
                headers: admin
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            await window.alert('Data publisher has been inactived!')
            await this.getPublishers();
        }
        else {
            window.alert('Data publisher is safe!')
        }

    }

    handleClickInactive = async (id) => {
        console.log('data ke: ' + id)

        const admin = this.authHeader();

        const r = window.confirm('Are you sure to active this publisher?')
        if (r == true) {
            await axios.delete("http://localhost:7070/api/dynteam/book/publisher/actived/" + id, {
                headers: admin
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            await window.alert('Data publisher has been actived!')
            await this.getPublishers();
        }
        else {
            window.alert('Data publisher is safe!')
        }

    }

    getIdPublisher = (id) => {
        const admin = this.authHeader();

        axios.get('http://localhost:7070/api/dynteam/book/publisher/' + id, {
            headers: admin
        })
            .then(res => {
                console.log(res);
                this.setState({
                    publisherId: res.data.publisherId,
                    publisherName: res.data.publisherName
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

        const publisher = {
            publisherName: this.state.publisherName
        }

        axios.post("http://localhost:7070/api/dynteam/book/publisher/insert", publisher, {
            headers: admin
        })
            .then(function (response) {
                window.alert(this.state.publisherName + ' data added successfully!')
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    onSubmitE = () => {
        const admin = this.authHeader();

        const publisher = {
            publisherName: this.state.publisherName
        }

        console.log(this.state.publisherId);
        console.log(this.state.publisher);

        axios.put("http://localhost:7070/api/dynteam/book/publisher/update/" + this.state.publisherId, publisher, {
            headers: admin
        })
            .then(function (response) {
                window.alert(this.state.publisherName + ' data updated successfully!')
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    publisherChange = (event) => {
        this.setState({
            publisherName: event.target.value
        })
    }

    columns = [{
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
                        <Button color='primary' className="mr-2" onClick={() => this.handleClickActive(row.publisherId)}>
                            Active
                        </Button>
                    </Row>
                )
            }
            else {
                return (
                    <Row className='justify-content-center'>
                        <Button color='danger' className="mr-2" onClick={() => this.handleClickInactive(row.publisherId)}>
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
                    <Button color='warning' className="mr-2 btn-crud" onClick={() => this.getIdPublisher(row.publisherId)}>
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                </Row>
            )
        }
    }];

    defaultSorted = [{
        dataField: 'publisherId',
        order: 'asc'
    }];


    render() {
        return (
            <>
                <ToolkitProvider
                    bootstrap4
                    keyField="publisherId"
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
                                                <FontAwesomeIcon icon={faPlusCircle} />Add Publisher</Button>

                                            {/* modal add */}
                                            <Modal show={this.state.show}>
                                                <Modal.Header closeButton onClick={this.closeModal}>
                                                    <Modal.Title>Add Publisher</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <>
                                                        <form onSubmit={this.onSubmit}>
                                                            <div className="form-group">
                                                                <label htmlFor="publisherName">Publisher Name</label>
                                                                <input className="form-control" id="publisherName" value={this.state.publisherName} onChange={this.publisherChange} required />
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
                                                    <Modal.Title>Edit Publisher</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <>
                                                        <form onSubmit={this.onSubmitE}>
                                                            <div className="form-group">
                                                                <label htmlFor="publisherName">Publisher Name</label>
                                                                <input className="form-control" id="publisherName" value={this.state.publisherName} onChange={this.publisherChange} required />
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


export default TablePublisher;