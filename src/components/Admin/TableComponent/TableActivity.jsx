import 'bootstrap/dist/css/bootstrap.min.css';
import { Badge, Row, Col, Spinner, Label } from 'reactstrap';
import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import { Link } from 'react-router-dom';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { connect } from 'react-redux';
import swal from 'sweetalert';

const { SearchBar } = Search;

const handleClickExtend = (no) => {
    console.log('data ke: ' + no)
    swal({
        title: "Are you sure to extends activity?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                swal("Activity has been extended!", {
                    icon: "success",
                });
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
        .then((willDelete) => {
            if (willDelete) {
                swal("Activity has been return!", {
                    icon: "success",
                });
            } else {
                swal("Activity is not return!");
            }
        });
}

const columns = [{
    dataField: 'id',
    text: 'No',
    sort: true,
    headerStyle: () => {
        return { width: '7%' }
    }
}, {
    dataField: 'id_activity',
    text: 'ID User',
    sort: true
}, {
    dataField: 'title_book',
    text: 'Name',
    sort: true
}, {
    dataField: 'user',
    text: 'Email',
    sort: true
}, {
    dataField: 'start_date',
    text: 'Phone Number',
    sort: true
}, {
    dataField: 'return_date',
    text: 'Member',
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
        if (row.fine === 0) {
            return (
                <>
                    <Row className='justify-content-center'>
                        <Badge color='primary' className="text-center">
                            Rp {row.fine}
                        </Badge>
                    </Row>
                    <Row className='justify-content-center'>
                        <Label className="text-xs text-muted">{row.status}</Label>
                    </Row>
                </>
            )
        }
        else {
            return (
                <>
                    <Row className='justify-content-center'>
                        <Badge color='danger' className="mr-2">
                            Rp {row.fine * 800}
                        </Badge>
                    </Row>
                    <Row className='justify-content-center'>
                        <Label className="text-xs text-muted">{row.status}</Label>
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
                    <Badge color='success' className="mr-2" onClick={() => handleClickExtend(row.id)}>
                        Extend
                    </Badge>
                </Link>

                <Link to={'#'}>
                    <Badge color='danger' className="mr-2" onClick={() => handleClickReturn(row.id)}>
                        Return
                    </Badge>
                </Link>

            </Row>
        )
    }
}];

const defaultSorted = [{
    dataField: 'id',
    order: 'asc'
}];

const mapStateToProps = (state) => {
    return {
        getActivityList: state.activity.getActivityList,
        errorActivity: state.activity.errorActivity
    }
}


const TableActivity = (props) => {
    return (
        <>
            {props.getActivityList ? <ToolkitProvider
                bootstrap4
                keyField='id'
                data={props.getActivityList}
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
            </ToolkitProvider> : (
                <div className="text-center">
                    { props.errorActivity ? <h1>{props.errorActivity}</h1> : <Spinner color='dark' />}
                </div>
            )
            }

        </>
    )
}

export default connect(mapStateToProps, null)(TableActivity);
