import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { Col, FormGroup, Row, Input, Label, Button } from 'reactstrap'
import PublisherValidation from '../../../validations/Admin/PublisherValidation'

const renderField = ({
    input,
    type,
    placeholder,
    label,
    disabled,
    readOnly,
    meta: { touched, error, warning },
}) => (
    <Row>
        <Col md='12'>
            <Label htmlfor='{input}' className='col-form-label'>
                {label}
            </Label>
        </Col>
        <Col md='12'>
            <Input
                {...input}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
            ></Input>
            {touched &&
                ((error && <p style={{ color: 'red' }}>{error}</p>) ||
                    (warning && <p style={{ color: 'brown' }}>{warning}</p>))}
        </Col>
    </Row>

)

class FormCreatePublisher extends Component {
    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <FormGroup row>

                    <Col md={6}>
                        <FormGroup>
                            <Field
                                type='text'
                                name='publisherName'
                                component={renderField}
                                label='Publisher Name :'
                            />
                        </FormGroup>
                    </Col>

                </FormGroup>

                <FormGroup row className='my-0'>
                    <Col md={12}>
                        <FormGroup>
                            <Button
                                type='submit'
                                color='primary'
                                disabled={this.props.submitting}
                            >
                                Add
                            </Button>
                        </FormGroup>
                    </Col>
                </FormGroup>

            </form>
        )
    }
}

FormCreatePublisher = reduxForm({
    form: 'formCreatePublisher',
    validate: PublisherValidation,
    enableReinitialize: true,
})(FormCreatePublisher)

export default connect()(FormCreatePublisher);