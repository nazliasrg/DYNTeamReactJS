import React, { Component } from 'react'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Button, Row, Col } from 'reactstrap';
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
                swal("Data author has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("Data author is safe!");
            }
        });
}

const products = [
    { authorId: 1, authorCode: "AU1", authorName: "Tere Liye" },
    { authorId: 2, authorCode: "AU2", authorName: "Nazli" }
];

const columns = [{
    dataField: 'authorId',
    text: 'No',
    sort: true,
    headerStyle: () => {
        return { width: '7%' }
    }
}, {
    dataField: 'authorCode',
    text: 'Author Code',
    sort: true
}, {
    dataField: 'authorName',
    text: 'Author Name',
    sort: true
}, {
    dataField: 'link',
    text: 'Action',
    headerStyle: () => {
        return { textAlign: 'center' }
    },
    formatter: (rowContent, row) => {
        return (
            <Row className='justify-content-center'>
                <Link to={'edit-author/' + row.authorId}>
                    <Button color='warning' className="mr-2 btn-crud">
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                </Link>
                <Button color='danger' className="mr-2 btn-crud" onClick={() => handleClick(row.authorId)}>
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


const TableAuthor = (props) => {
    return (
        <>
            <ToolkitProvider
                bootstrap4
                keyField="id"
                data={products}
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
                                        <Link to={'/add-author'}>
                                            <Button color='dark' className="mr-2">
                                                <FontAwesomeIcon icon={faPlusCircle} />
                                                Add Author
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


export default TableAuthor;