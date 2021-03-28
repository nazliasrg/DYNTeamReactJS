import { faEdit, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Badge, Row, Col, Spinner } from 'reactstrap';
import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import { Link } from 'react-router-dom';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { connect } from 'react-redux';

const { SearchBar } = Search;

const columns = [{
    dataField: 'id',
    text: 'No',
    sort: true,
    headerStyle: () => {
        return { width: '7%' }
    }
}, {
    dataField: 'id_role',
    text: 'ID Role',
    sort: true
}, {
    dataField: 'username',
    text: 'Username',
    sort: true
}, {
    dataField: 'level',
    text: 'Level',
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
                <Link to={'edit-admin/' + row.id}>
                    <Button color='warning' className="mr-2">
                        <FontAwesomeIcon icon={faEdit} />
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
        getAdminList: state.adminRole.getAdminList,
        errorAdmin: state.adminRole.errorAdmin
    }
}


const TableAdmin = (props) => {
    return (
        <>
            {props.getAdminList ? <ToolkitProvider
                bootstrap4
                keyField='id'
                data={props.getAdminList}
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
                                        <Link to={'/create-admin'}>
                                            <Button color='dark' className="mr-2">
                                                <FontAwesomeIcon icon={faUserPlus} />
                                                Add Admin
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
                    { props.errorAdmin ? <h1>{props.errorAdmin}</h1> : <Spinner color='dark' />}
                </div>
            )
            }

        </>
    )
}

export default connect(mapStateToProps, null)(TableAdmin);
