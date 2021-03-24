import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { Col, Row } from 'reactstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'reactstrap'

const BackComponent = () => {
    return (
        <Row className='my-2'>
            <Col>
                <Link to={'/admin'}>
                    <Button color='dark'>
                        <FontAwesomeIcon icon={faArrowLeft} />
                            Back
                        </Button>
                </Link>
            </Col>
        </Row>
    )
}

export default BackComponent;
