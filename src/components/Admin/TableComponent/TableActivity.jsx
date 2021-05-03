import 'bootstrap/dist/css/bootstrap.min.css';
import { Badge, Row, Col, Spinner, Label } from 'reactstrap';
import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import { Link } from 'react-router-dom';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import swal from 'sweetalert';
import axios from 'axios'

const { SearchBar } = Search;

const handleClickExtend = (id) => {
    console.log('data ke: ' + id)
    swal({
        title: "Are you sure to extends activity?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willExtends) => {
            axios.put('http://localhost:7070/api/dynteam/request/extend/' + id)
                .then(function (res) {
                    console.log(res)
                })
                .catch(function (error) {
                    console.log(error)
                })

            if (willExtends) {
                swal("Activity has been extended!", {
                    icon: "success",
                })
                    .then((OK) => {
                        window.location.reload(false);
                    })
            } else {
                swal("Activity is not extended!");
            }
        });
}

const handleClickReturn = (id) => {
    console.log('data ke: ' + id)
    swal({
        title: "Are you sure to return activity?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willReturn) => {
            axios.put('http://localhost:7070/api/dynteam/request/return/' + id)
                .then(function (res) {
                    console.log(res)
                })
                .catch(function (error) {
                    console.log(error)
                })
            if (willReturn) {
                swal("Activity has been return!", {
                    icon: "success",
                })
                    .then((OK) => {
                        window.location.reload(false);
                    })
            } else {
                swal("Activity is not return!");
            }
        });
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

const TableActivity = (props) => {
    const { data } = props;
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
