import { faEdit, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
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
                swal("Data book has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("Data book is safe!");
            }
        });
}

const columns = [{
    dataField: 'id',
    text: 'No',
    sort: true,
    headerStyle: () => {
        return { width: '6%' }
    }
}, {
    dataField: 'id_book',
    text: 'ID Book',
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
                <img src={`../img/book/${row.id_book}.jpg`} className="img-thumbnail" style={{ width: '60px' }} alt="" />
            </Row>
        )
    }
}, {
    dataField: 'category',
    text: 'Category',
    sort: true
}, {
    dataField: 'title',
    text: 'Title',
    sort: true
}, {
    dataField: 'author',
    text: 'Author',
    sort: true
}, {
    dataField: 'publisher',
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
            <Row className='justify-content-center'>
                <Link to={'edit-book/' + row.id}>
                    <Button color='warning' className="mr-2">
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                </Link>
                <Button color='danger' className="mr-2" onClick={() => handleClick(row.id)}>
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

const mapStateToProps = (state) => {
    return {
        getBooksList: state.books.getBooksList,
        errorBooks: state.books.errorBooks
    }
}


const TableBooks = (props) => {
    return (
        <>
            {props.getBooksList ? <ToolkitProvider
                bootstrap4
                keyField='id'
                data={props.getBooksList}
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

                            <div className="justify-content-center">
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
                    { props.errorBooks ? <h1>{props.errorBooks}</h1> : <Spinner color='dark' />}
                </div>
            )
            }

        </>
    )
}

export default connect(mapStateToProps, null)(TableBooks);
