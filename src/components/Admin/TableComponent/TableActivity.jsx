import 'bootstrap/dist/css/bootstrap.min.css';
import { Badge, Row, Col } from 'reactstrap';
import React, { useEffect, useState } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import { Link } from 'react-router-dom';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import axios from 'axios'

const { SearchBar } = Search;


const TableActivity = () => {

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

    const getActivitiesCurrent = () => {
        const admin = authHeader();

        axios.get('http://localhost:7070/api/dynteam/request/getByStatusRent/2', {
            headers: admin
        })
            .then(res => {
                setData(res.data)
                console.log(data);
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    useEffect(async () => {
        await authHeader();
        await getActivitiesCurrent();
    })

    const handleClickExtend = (id) => {
        const admin = authHeader();

        console.log('data ke: ' + id)

        const r = window.confirm('Are you sure to extends activity?')
        if (r == true) {
            axios.put('http://localhost:7070/api/dynteam/request/extend/' + id, null, {
                headers: admin
            })
                .then(function (res) {
                    console.log(res)
                })
                .catch(function (error) {
                    console.log(error)
                })
            window.alert('Activity has been extended!')
            getActivitiesCurrent();
        }
        else {
            window.alert('Activity is not extended!')
        }
    }

    const handleClickReturn = (id) => {
        const admin = authHeader();

        console.log('data ke: ' + id)

        const r = window.confirm('Are you sure to return activity?')
        if (r == true) {
            axios.put('http://localhost:7070/api/dynteam/request/return/' + id, null, {
                headers: admin
            })
                .then(function (res) {
                    console.log(res)
                })
                .catch(function (error) {
                    console.log(error)
                })
            window.alert('Activity has been return!')
            getActivitiesCurrent();
        }
        else {
            window.alert('Activity is not return!')
        }

    }

    const columns = [{
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
        sort: true
    }, {
        dataField: 'approvedDate',
        text: 'Approved Date',
        sort: true
    }, {
        dataField: 'decisionDate',
        text: 'Return Date',
        sort: true
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
                        <Badge color='success' className="mr-2" onClick={() => handleClickExtend(row.requestId)}>
                            Extend
                        </Badge>
                    </Link>

                    <Link to={'#'}>
                        <Badge color='danger' className="mr-2" onClick={() => handleClickReturn(row.requestId)}>
                            Return
                        </Badge>
                    </Link>

                </Row>
            )
        }
    }];

    const defaultSorted = [{
        dataField: 'requestId',
        order: 'asc'
    }];

    return (
        <>
            <ToolkitProvider
                bootstrap4
                keyField='id'
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

export default TableActivity;
