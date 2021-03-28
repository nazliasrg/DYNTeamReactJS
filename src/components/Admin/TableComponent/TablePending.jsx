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

const { SearchBar } = Search;

const handleClickAccept = (id) => {
    console.log('data ke: ' + id)
    swal({
        title: "Are you sure to accept request?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                swal("Request has been accepted!", {
                    icon: "success",
                });
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
        .then((willDelete) => {
            if (willDelete) {
                swal("Request has been declined!", {
                    icon: "success",
                });
            } else {
                swal("Request is not declined!");
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
                    <Button color='success' className="mr-2 btn-crud" onClick={() => handleClickAccept(row.id)}>
                        <FontAwesomeIcon icon={faCheck} />
                    </Button>
                </Link>

                <Link to={'#'}>
                    <Button color='danger' className="mr-2 btn-crud" onClick={() => handleClickDecline(row.id)}>
                        <FontAwesomeIcon icon={faTimes} />
                    </Button>
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


const TablePending = (props) => {
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

export default connect(mapStateToProps, null)(TablePending);
