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
import axios from 'axios';
import { useHistory } from "react-router";

const { SearchBar } = Search;

const handleClickActive = (id) => {
    console.log('data ke: ' + id)
    swal({
        title: "Are you sure to inactive this author?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            inactivedAuthor(id);
            if (willDelete) {
                swal("Data author has been inactived!", {
                    icon: "success",
                }).then((OK) => {
                    window.location.reload(false);
                })

            } else {
                swal("Data author is safe!");
            }
        });
}

const inactivedAuthor = (id) => {
    axios.delete("http://localhost:7070/api/dynteam/book/author/delete/" + id)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

const handleClickInactive = (id) => {
    console.log('data ke: ' + id)
    swal({
        title: "Are you sure to active this author?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            activedAuthor(id);
            if (willDelete) {
                swal("Data author has been actived!", {
                    icon: "success",
                }).then((OK) => {
                    window.location.reload(false);
                })

            } else {
                swal("Data author is safe!");
            }
        });
}

const activedAuthor = (id) => {
    axios.put("http://localhost:7070/api/dynteam/book/author/actived/" + id)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

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
        if (row.statusAuthor === 1) {
            return (
                <Row className='justify-content-center'>
                    <Button color='primary' className="mr-2" onClick={() => handleClickActive(row.authorId)}>
                        Active
                    </Button>
                </Row>
            )
        }
        else {
            return (
                <Row className='justify-content-center'>
                    <Button color='danger' className="mr-2" onClick={() => handleClickInactive(row.authorId)}>
                        Inactive
                    </Button>
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
                <Link to={'edit-author/' + row.authorId}>
                    <Button color='warning' className="mr-2 btn-crud">
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


const TableAuthor = (props) => {
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