import 'bootstrap/dist/css/bootstrap.min.css';
import { Badge, Row, Col, Spinner } from 'reactstrap';
import React, { useEffect, useState } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import axios from 'axios'

const { SearchBar } = Search;

const TableHistoryTrans = (props) => {
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

    const getTransactions = () => {
        axios.get('http://localhost:7070/api/dynteam/auth/user/transactions/1')
            .then(res => {
                setData(res.data)
                console.log(data);
            })
    }

    useEffect(async () => {
        await authHeader();
        await getTransactions();
    })

    const columns = [{
        dataField: 'transactionId',
        text: 'No',
        sort: true,
        headerStyle: () => {
            return { width: '7%' }
        }
    }, {
        dataField: 'description',
        text: 'Type',
        sort: true
    }, {
        dataField: 'cashIn',
        text: 'Debit',
        sort: true,
        headerStyle: () => {
            return {
                textAlign: 'center'
            }
        },
        formatter: (rowContent, row) => {
            if (row.cashIn === 0) {
                return (
                    <Row className='justify-content-center'>
                        <Badge color="warning">
                            Rp 0
                    </Badge>
                    </Row>
                )
            }
            else {
                return (
                    <Row className='justify-content-center'>
                        <Badge color="success">
                            Rp {row.cashIn}
                        </Badge>
                    </Row>
                )
            }
        }
    }, {
        dataField: 'cashOut',
        text: 'Kredit',
        sort: true,
        headerStyle: () => {
            return {
                textAlign: 'center'
            }
        },
        formatter: (rowContent, row) => {
            if (row.cashOut === 0) {
                return (
                    <Row className='justify-content-center'>
                        <Badge color="warning">
                            Rp 0
                    </Badge>
                    </Row>
                )
            }
            else {
                return (
                    <Row className='justify-content-center'>
                        <Badge color="success">
                            Rp {row.cashOut}
                        </Badge>
                    </Row>
                )
            }
        }
    }, {
        dataField: 'userEntity.username',
        text: 'Username',
        sort: true
    }, {
        dataField: 'userEntity.saldoUser',
        text: 'Saldo',
        sort: true,
        headerStyle: () => {
            return {
                textAlign: 'center'
            }
        },
        formatter: (rowContent, row) => {
            if (row.userEntity.saldoUser === 0) {
                return (
                    <Row className='justify-content-center'>
                        <Badge color="warning">
                            Rp 0
                    </Badge>
                    </Row>
                )
            }
            else if (row.userEntity.saldoUser < 0) {
                return (
                    <Row className='justify-content-center'>
                        <Badge color="danger">
                            Rp {row.userEntity.saldoUser}
                        </Badge>
                    </Row>
                )
            }
            else {
                return (
                    <Row className='justify-content-center'>
                        <Badge color="success">
                            Rp {row.userEntity.saldoUser}
                        </Badge>
                    </Row>
                )
            }
        }
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
    }];

    const defaultSorted = [{
        dataField: 'transactionId',
        order: 'asc'
    }];

    return (
        <>
            <ToolkitProvider
                bootstrap4
                keyField='transactionId'
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
                                    <div className="float-right">
                                        <SearchBar {...props.searchProps} placeholder="Search .." />
                                    </div>
                                </Col>
                            </Row>

                            <div className="float-center">
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

export default TableHistoryTrans;
