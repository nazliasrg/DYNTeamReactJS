import React, { Component } from 'react'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Badge, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'

const { SearchBar } = Search;

class TableHistory extends Component {
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
        await this.getActivitiesHistory();
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

    getActivitiesHistory = () => {
        const admin = this.authHeader();

        axios.get('http://localhost:7070/api/dynteam/request/getByStatusRent/3', {
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
        text: 'Status',
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
                                In the Periode
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
                                {row.fine} days late
                            </Badge>
                        </Row>
                    </>
                )
            }
        }
    }, {
        dataField: 'cost',
        text: 'Cost',
        sort: true,
        headerStyle: () => {
            return {
                textAlign: 'center'
            }
        },
        formatter: (rowContent, row) => {
            if (row.cost === null || row.cost === 0) {
                return (
                    <label>
                        Rp 0
                    </label>
                )
            }
            else {
                return (
                    <label>
                        Rp {row.cost}
                    </label>
                )
            }

        }
    }
    ];

    defaultSorted = [{
        dataField: 'requestId',
        order: 'desc'
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


export default TableHistory;