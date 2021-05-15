import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Button, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'

const { SearchBar } = Search;

class TablePending extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    async componentDidMount() {
        await this.authHeader();
        await this.getActivitiesPending();
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

    getActivitiesPending = () => {
        const admin = this.authHeader();

        axios.get('http://localhost:7070/api/dynteam/request/getByStatusRent/1', {
            headers: admin
        })
            .then(res => {
                this.setState({
                    data: res.data
                })
                console.log(this.state.data);
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    handleClickAccept = async (id) => {

        const admin = this.authHeader();

        console.log('data ke: ' + id)

        const r = window.confirm('Are you sure to accept request?')
        if (r == true) {
            await axios.put('http://localhost:7070/api/dynteam/request/confirm/' + id, null, {
                headers: admin
            })
                .then(function (res) {
                    console.log(res)
                })
                .catch(function (error) {
                    console.log(error);
                });
            await window.alert('Request has been accepted!')
            await this.getActivitiesPending();
        }
        else {
            window.alert('Request is not accepted!')
        }

    }

    handleClickDecline = async (id) => {

        const admin = this.authHeader();

        console.log('data ke: ' + id)

        const r = window.confirm('Are you sure to decline request?')
        if (r == true) {
            await axios.put('http://localhost:7070/api/dynteam/request/decline/' + id, null, {
                headers: admin
            })
                .then(function (res) {
                    console.log(res)
                })
                .catch(function (error) {
                    console.log(error);
                });
            await window.alert('Request has been declined!')
            await this.getActivitiesPending();
        }
        else {
            window.alert('Request is not declined!')
        }

    }

    columns = [{
        dataField: 'requestId',
        text: 'No',
        sort: true,
        headerStyle: () => {
            return { width: '7%' }
        }
    }, {
        dataField: 'userEntity.username',
        text: 'Username',
        sort: true
    }, {
        dataField: 'requestCode',
        text: 'Request Code',
        sort: true
    }, {
        dataField: 'bookEntity.title',
        text: 'Title',
        sort: true
    }, {
        dataField: 'bookEntity.stock',
        text: 'Stock',
        sort: true
    }, {
        dataField: 'durationEntity.duration',
        text: 'Duration',
        sort: true
    }, {
        dataField: 'requestDate',
        text: 'Request Date',
        sort: true,
        formatter: (rowContent, row) => {
            const formatter = new Intl.DateTimeFormat("en-GB", {
                year: 'numeric', month: 'long', day: 'numeric',
                hour: 'numeric', minute: 'numeric', second: 'numeric',
                hour12: false
            });
            const date = formatter.format(Date.parse(row.requestDate));
            return (
                <label>{date}</label>
            )
        }
    }, {
        dataField: 'link',
        text: 'Action',
        headerStyle: () => {
            return {
                textAlign: 'center'
            }
        },
        formatter: (rowContent, row) => {
            return (
                <Row className='justify-content-center'>
                    <Link to={'#'}>
                        <Button color='success' className="mr-2 btn-crud" onClick={() => this.handleClickAccept(row.requestId)}>
                            <FontAwesomeIcon icon={faCheck} />
                        </Button>
                    </Link>

                    <Link to={'#'}>
                        <Button color='danger' className="mr-2 btn-crud" onClick={() => this.handleClickDecline(row.requestId)}>
                            <FontAwesomeIcon icon={faTimes} />
                        </Button>
                    </Link>

                </Row>
            )
        }
    }];

    defaultSorted = [{
        dataField: 'requestId',
        order: 'asc'
    }];

    render() {
        return (
            <>
                <ToolkitProvider
                    bootstrap4
                    keyField='requestId'
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
                                        <div className="float-left">
                                            <SearchBar {...props.searchProps} placeholder="Search .." />
                                        </div>
                                    </Col>
                                </Row>

                                <div className="float-center mt-2">
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


export default TablePending;