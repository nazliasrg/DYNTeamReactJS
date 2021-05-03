import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Row, Col, Spinner } from 'reactstrap';
import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import { Link } from 'react-router-dom';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import axios from 'axios'

const { SearchBar } = Search;

const handleClickAccept = (id) => {
    console.log('data ke: ' + id)
    swal({
        title: "Are you sure to accept request?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willAccept) => {
            axios.put('http://localhost:7070/api/dynteam/request/confirm/' + id)
                .then(function (res) {
                    console.log(res)
                })
                .catch(function (error) {
                    console.log(error);
                });

            if (willAccept) {
                swal("Request has been accepted!", {
                    icon: "success",
                })
                    .then((OK) => {
                        window.location.reload(false);
                    })
            } else {
                swal("Request is not accepted!");
            }
        });
}

const handleClickDecline = (id) => {
    console.log('data ke: ' + id)
    swal({
        title: "Are you sure to decline request?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDecline) => {
            axios.put('http://localhost:7070/api/dynteam/request/decline/' + id)
                .then(function (res) {
                    console.log(res)
                })
                .catch(function (error) {
                    console.log(error);
                });
            if (willDecline) {
                swal("Request has been declined!", {
                    icon: "success",
                }).then((OK) => {
                    window.location.reload(false);
                })
            } else {
                swal("Request is not declined!");
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
    sort: true
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
                    <Button color='success' className="mr-2 btn-crud" onClick={() => handleClickAccept(row.requestId)}>
                        <FontAwesomeIcon icon={faCheck} />
                    </Button>
                </Link>

                <Link to={'#'}>
                    <Button color='danger' className="mr-2 btn-crud" onClick={() => handleClickDecline(row.requestId)}>
                        <FontAwesomeIcon icon={faTimes} />
                    </Button>
                </Link>

            </Row>
        )
    }
}];

const defaultSorted = [{
    dataField: 'requestId',
    order: 'asc'
}];

const TablePending = (props) => {
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

export default connect()(TablePending);
