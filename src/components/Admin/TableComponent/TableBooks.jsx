import { faMinus, faPlus, faEdit, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
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
                swal("Data book has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("Data book is safe!");
            }
        });
}

const TableBooks = (props) => {

    const { data } = props;

    const columns = [{
        dataField: 'bookId',
        text: 'No',
        sort: true,
        headerStyle: () => {
            return { width: '7%' }
        }
    }, {
        dataField: 'bookCode',
        text: 'Book Code',
        sort: true
    }, {
        dataField: 'cover',
        text: 'Cover',
        headerStyle: () => {
            return { textAlign: 'center' }
        },
        sort: true,
        formatter: (cell, row) => {
            return (
                <Row className='justify-content-center'>
                    <img src={`http://localhost:7070/api/dynteam/book/cover/download/${row.cover}`} className="img-thumbnail img-book" style={{ width: '60px' }} alt="" />
                </Row>
            )
        }
    }, {
        dataField: 'categoryEntity.categoryName',
        text: 'Category',
        sort: true
    }, {
        dataField: 'title',
        text: 'Title',
        sort: true
    }, {
        dataField: 'authorEntity.authorName',
        text: 'Author',
        sort: true
    }, {
        dataField: 'publisherEntity.publisherName',
        text: 'Publisher',
        sort: true
    }, {
        dataField: 'year',
        text: 'Year',
        sort: true
    }, {
        dataField: 'stock',
        text: 'Stock',
        sort: true,
        headerStyle: () => {
            return { textAlign: 'center' }
        },
        style: {
            textAlign: 'center'
        }
    }, {
        dataField: 'link',
        text: 'Action',
        headerStyle: () => {
            return { textAlign: 'center' }
        },
        formatter: (rowContent, row) => {
            return (
                <>
                    <Row className='justify-content-center'>
                        <Link to={'edit-book/' + row.bookId}>
                            <Button color='warning' className="mr-2 btn-crud">
                                <FontAwesomeIcon icon={faEdit} />
                            </Button>
                        </Link>
                        <Button color='danger' className="mr-2 btn-crud" onClick={() => handleClick(row.bookId)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                    </Row>
                    <Row className='justify-content-center mt-2'>
                        <Link to={'add-stock/' + row.bookId}>
                            <Button color='warning' className="mr-2 btn-crud">
                                <FontAwesomeIcon icon={faPlus} />
                            </Button>
                        </Link>
                        <Link to={'discrepancy/' + row.bookId}>
                            <Button color='warning' className="mr-2 btn-crud">
                                <FontAwesomeIcon icon={faMinus} />
                            </Button>
                        </Link>
                    </Row>
                </>
            )
        }
    }];

    const defaultSorted = [{
        dataField: 'bookId',
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
                                    <SearchBar {...props.searchProps} placeholder="Search .." />
                                </Col>
                                <Col>
                                    <div className="float-right">
                                        <Link to={'/add-book'}>
                                            <Button color='dark' className="mr-2">
                                                <FontAwesomeIcon icon={faPlusCircle} />
                                                Add Book
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

export default connect()(TableBooks);
