import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Row, Col } from 'reactstrap';
import React, { useEffect, useState } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import { Link } from 'react-router-dom';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import axios from 'axios'

const { SearchBar } = Search;

const TablePending = (props) => {

    const [data, setData] = useState([]);

    const authHeader = () => {
        const admin = JSON.parse(localStorage.getItem('data_admin'));
        console.log(admin)

        if (admin && admin.data.token) {
            return {
                'authorization': `Bearer ${admin.data.token}`
            }
        }
        else {
            return null;
        }
    }

    const getActivitiesPending = () => {
        const admin = authHeader();

        axios.get('http://localhost:7070/api/dynteam/request/getByStatusRent/1', {
            headers: admin
        })
            .then(res => {
                setData(res.data)
                console.log(data);
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    useEffect(async () => {
        await authHeader();
        await getActivitiesPending();
    })

    const handleClickAccept = (id) => {

        const admin = authHeader();

        console.log('data ke: ' + id)

        const r = window.confirm('Are you sure to accept request?')
        if (r == true) {
            axios.put('http://localhost:7070/api/dynteam/request/confirm/' + id, null, {
                headers: admin
            })
                .then(function (res) {
                    console.log(res)
                })
                .catch(function (error) {
                    console.log(error);
                });
            window.alert('Request has been accepted!')
            getActivitiesPending();
        }
        else {
            window.alert('Request is not accepted!')
        }

    }

    const handleClickDecline = (id) => {

        const admin = authHeader();

        console.log('data ke: ' + id)

        const r = window.confirm('Are you sure to decline request?')
        if (r == true) {
            axios.put('http://localhost:7070/api/dynteam/request/decline/' + id, null, {
                headers: admin
            })
                .then(function (res) {
                    console.log(res)
                })
                .catch(function (error) {
                    console.log(error);
                });
            window.alert('Request has been declined!')
            getActivitiesPending();
        }
        else {
            window.alert('Request is not declined!')
        }

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

    return (
        <>
            <ToolkitProvider
                bootstrap4
                keyField='requestId'
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

export default TablePending;
