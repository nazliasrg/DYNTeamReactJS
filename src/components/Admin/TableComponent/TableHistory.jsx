import 'bootstrap/dist/css/bootstrap.min.css';
import { Badge, Row, Col, Spinner } from 'reactstrap';
import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { connect } from 'react-redux';

const { SearchBar } = Search;

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
    dataField: 'durationEntity.duration',
    text: 'Duration',
    sort: true
}, {
    dataField: 'requestDate',
    text: 'Request Date',
    sort: true
}, {
    dataField: 'approvedDate',
    text: 'Approved Date',
    sort: true
}, {
    dataField: 'decisionDate',
    text: 'Return Date',
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
        if (row.fine === 0 || row.fine === null) {
            return (
                <>
                    <Row className='justify-content-center'>
                        <Badge color='primary' className="text-center">
                            Rp 0
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
                            Rp {row.fine * 1000}
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
        if (row.fine === 0 || row.fine === null) {
            return (
                <>
                    <Row className='justify-content-center'>
                        <Badge color='primary' className="text-center">
                            In the Periode
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
                            {row.fine} days late
                        </Badge>
                    </Row>
                </>
            )
        }
    }
}, {
    dataField: 'cost',
    text: 'Cost',
    sort: true,
    headerStyle: () => {
        return {
            textAlign: 'center'
        }
    },
    formatter: (rowContent, row) => {
        if (row.cost === null || row.cost === 0) {
            return (
                <label>
                    Rp 0
                </label>
            )
        }
        else {
            return (
                <label>
                    Rp {row.cost}
                </label>
            )
        }

    }
}
];

const defaultSorted = [{
    dataField: 'requestId',
    order: 'desc'
}];

const TableHistory = (props) => {

    const { data } = props;
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

export default connect()(TableHistory);
