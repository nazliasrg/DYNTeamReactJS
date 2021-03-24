import 'bootstrap/dist/css/bootstrap.min.css';
import { Badge, Row, Col, Spinner } from 'reactstrap';
import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { connect } from 'react-redux';

const { SearchBar } = Search;

const columns = [{
    dataField: 'no',
    text: 'No',
    sort: true,
    headerStyle: () => {
        return {
            width: '6%'
        }
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
    text: 'Fine',
    headerStyle: () => {
        return {
            textAlign: 'center'
        }
    },
    formatter: (rowContent, row) => {
        if (row.fine === 0) {
            return (
                <>
                    <Row className='justify-content-center'>
                        <Badge color='primary' className="text-center">
                            Rp {row.fine}
                        </Badge>
                    </Row>
                </>
            )
        }
        else {
            return (
                <>
                    <Row className='justify-content-center'>
                        <Badge color='danger' className="mr-2">
                            Rp {row.fine * 800}
                        </Badge>
                    </Row>
                </>
            )
        }
    }
}, {
    dataField: 'link',
    text: 'Status',
    headerStyle: () => {
        return {
            textAlign: 'center'
        }
    },
    formatter: (rowContent, row) => {
        if (row.status === "In the Periode") {
            return (
                <>
                    <Row className='justify-content-center'>
                        <Badge color='primary' className="text-center">
                            {row.status}
                        </Badge>
                    </Row>
                </>
            )
        }
        else {
            return (
                <>
                    <Row className='justify-content-center'>
                        <Badge color='danger' className="mr-2">
                            {row.status}
                        </Badge>
                    </Row>
                </>
            )
        }
    }
}
];

const defaultSorted = [{
    dataField: 'no',
    order: 'asc'
}];

const mapStateToProps = (state) => {
    return {
        getActivityList: state.activity.getActivityList,
        errorActivity: state.activity.errorActivity
    }
}


const TableHistory = (props) => {
    return (
        <>
            {props.getActivityList ? <ToolkitProvider
                bootstrap4
                keyField='no'
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

export default connect(mapStateToProps, null)(TableHistory);
