import React, { Component } from 'react'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Badge, Button, Row, Col } from 'reactstrap';
import { faEdit, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

const { SearchBar } = Search;

const handleClick = (id) => {
    console.log('data ke: ' + id)
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover data!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                swal("Data category has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("Data category is safe!");
            }
        });
}
const products = [
    { categoryId: 1, categoryCode: "CA1", categoryName: "Novel", categoryStatus: 1 },
    { categoryId: 2, categoryCode: "CA2", categoryName: "Computer & Technology", categoryStatus: 0 }
];

const columns = [{
    dataField: 'categoryId',
    text: 'No',
    sort: true,
    headerStyle: () => {
        return { width: '7%' }
    }
}, {
    dataField: 'categoryCode',
    text: 'Category Code',
    sort: true
}, {
    dataField: 'categoryName',
    text: 'Category Name',
    sort: true
},
{
    dataField: 'link',
    text: 'Status',
    headerStyle: () => {
        return {
            textAlign: 'center'
        }
    },
    formatter: (rowContent, row) => {
        if (row.categoryStatus === 1) {
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
        return { textAlign: 'center' }
    },
    formatter: (rowContent, row) => {
        return (
            <Row className='justify-content-center'>
                <Link to={'edit-category/' + row.categoryId}>
                    <Button color='warning' className="mr-2 btn-crud">
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                </Link>
                <Button color='danger' className="mr-2 btn-crud" onClick={() => handleClick(row.categoryId)}>
                    <FontAwesomeIcon icon={faTrash} />
                </Button>
            </Row>
        )
    }
}];

const defaultSorted = [{
    dataField: 'id',
    order: 'asc'
}];

const TableCategory = (props) => {
    const { data } = props;
    return (
        <>
            <ToolkitProvider
                bootstrap4
                keyField="id"
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
                                    <SearchBar {...props.searchProps} placeholder="Search .." />
                                </Col>
                                <Col>
                                    <div className="float-right">
                                        <Link to={'/add-category'}>
                                            <Button color='dark' className="mr-2">
                                                <FontAwesomeIcon icon={faPlusCircle} />
                                                Add Category
                                        </Button>
                                        </Link>
                                    </div>
                                </Col>
                            </Row>

                            <div className="justify-content-center tableAdmin">
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

export default TableCategory;