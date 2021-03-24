import { faEdit, faTrash, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Badge, Row, Col, Spinner } from 'reactstrap';
import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import { Link } from 'react-router-dom';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { connect } from 'react-redux';
import swal from 'sweetalert';



const { SearchBar } = Search;

const handleClick = (no) => {
    console.log('data ke: ' + no)
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover data!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                swal("Data user has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("Data user is safe!");
            }
        });
}

const columns = [{
    dataField: 'no',
    text: 'No',
    sort: true,
    headerStyle: () => {
        return { width: '6%' }
    }
}, {
    dataField: 'id_user',
    text: 'ID User',
    sort: true
}, {
    dataField: 'name',
    text: 'Name',
    sort: true
}, {
    dataField: 'email',
    text: 'Email',
    sort: true
}, {
    dataField: 'phone_number',
    text: 'Phone Number',
    sort: true
}, {
    dataField: 'member',
    text: 'Member',
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
        if (row.status === 1) {
            return (
                <Row className='justify-content-center'>
                    <Badge color='primary' className="mr-2">
                        Active
                    </Badge>
                </Row>
            )
        }
        else {
            return (
                <Row className='justify-content-center'>
                    <Badge color='danger' className="mr-2">
                        Inactive
                    </Badge>
                </Row>
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
                <Link to={'edit-user/' + row.no}>
                    <Button color='warning' className="mr-2">
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                </Link>
                <Button color='danger' className="mr-2" onClick={() => handleClick(row.no)}>
                    <FontAwesomeIcon icon={faTrash} />
                </Button>
            </Row>
        )
    }
}];

const defaultSorted = [{
    dataField: 'no',
    order: 'asc'
}];

const mapStateToProps = (state) => {
    return {
        getUsersList: state.users.getUsersList,
        errorUsers: state.users.errorUsers
    }
}


const TableUsers = (props) => {
    return (
        <>
            {props.getUsersList ? <ToolkitProvider
                bootstrap4
                keyField='no'
                data={props.getUsersList}
                columns={columns}
                defaultSorted={defaultSorted}
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
                                        <Link to={'/create-user'}>
                                            <Button color='dark' className="mr-2">
                                                <FontAwesomeIcon icon={faUserPlus} />
                                                Add User
                                        </Button>
                                        </Link>
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
                    { props.errorUsers ? <h1>{props.errorUsers}</h1> : <Spinner color='dark' />}
                </div>
            )
            }

        </>
    )
}

export default connect(mapStateToProps, null)(TableUsers);
