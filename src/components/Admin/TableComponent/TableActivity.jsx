import React, { Component } from 'react'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Badge, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'

const { SearchBar } = Search;

class TableActivity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    async componentDidMount() {
        await this.authHeader();
        await this.getActivitiesCurrent();
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

    getActivitiesCurrent = () => {
        const admin = this.authHeader();

        axios.get('http://localhost:7070/api/dynteam/request/getByStatusRent/2', {
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

    handleClickExtend = async (id) => {
        const admin = this.authHeader();

        console.log('data ke: ' + id)

        const r = window.confirm('Are you sure to extends activity?')
        if (r == true) {
            await axios.put('http://localhost:7070/api/dynteam/request/extend/' + id, null, {
                headers: admin
            })
                .then(function (res) {
                    console.log(res)
                })
                .catch(function (error) {
                    console.log(error)
                })
            await window.alert('Activity has been extended!')
            await this.getActivitiesCurrent();
        }
        else {
            window.alert('Activity is not extended!')
        }
    }

    handleClickReturn = async (id) => {
        const admin = this.authHeader();

        console.log('data ke: ' + id)

        const r = window.confirm('Are you sure to return activity?')
        if (r == true) {
            await axios.put('http://localhost:7070/api/dynteam/request/return/' + id, null, {
                headers: admin
            })
                .then(function (res) {
                    console.log(res)
                })
                .catch(function (error) {
                    console.log(error)
                })
            await window.alert('Activity has been return!')
            await this.getActivitiesCurrent();
        }
        else {
            window.alert('Activity is not return!')
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
        dataField: 'approvedDate',
        text: 'Approved Date',
        sort: true,
        formatter: (rowContent, row) => {
            const formatter = new Intl.DateTimeFormat("en-GB", {
                year: 'numeric', month: 'long', day: 'numeric',
                hour: 'numeric', minute: 'numeric', second: 'numeric',
                hour12: false
            });
            const date = formatter.format(Date.parse(row.approvedDate));
            return (
                <label>{date}</label>
            )
        }
    }, {
        dataField: 'decisionDate',
        text: 'Return Date',
        sort: true,
        formatter: (rowContent, row) => {
            const formatter = new Intl.DateTimeFormat("en-GB", {
                year: 'numeric', month: 'long', day: 'numeric',
                hour: 'numeric', minute: 'numeric', second: 'numeric',
                hour12: false
            });
            const date = formatter.format(Date.parse(row.decisionDate));
            return (
                <label>{date}</label>
            )
        }
    }, {
        dataField: 'link',
        text: 'Fine',
        headerStyle: () => {
            return {
                textAlign: 'center'
            }
        },
        formatter: (rowContent, row) => {
            if (row.fine === 0 || row.fine === null) {
                return (
                    <>
                        <Row className='justify-content-center'>
                            <Badge color='primary' className="text-center">
                                Rp 0
                            </Badge>
                        </Row>
                    </>
                )
            }
            else {
                return (
                    <>
                        <Row className='justify-content-center'>
                            <Badge color='danger' className="mr-2">
                                Rp {row.fine * 1000}
                            </Badge>
                        </Row>
                    </>
                )
            }
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
                        <Badge color='success' className="mr-2" onClick={() => this.handleClickExtend(row.requestId)}>
                            Extend
                        </Badge>
                    </Link>

                    <Link to={'#'}>
                        <Badge color='danger' className="mr-2" onClick={() => this.handleClickReturn(row.requestId)}>
                            Return
                        </Badge>
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
                    keyField='id'
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
                                        <div className="float-right">
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


export default TableActivity;