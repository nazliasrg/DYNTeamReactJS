import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { Col, FormGroup, Row, Input, Label, Button } from 'reactstrap'
import AuthorValidation from '../../../validations/Admin/AuthorValidation'

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

class FormCreateAuthor extends Component {
    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <FormGroup row>

                    <Col md={6}>
                        <FormGroup>
                            <Field
                                type='text'
                                name='authorName'
                                component={renderField}
                                label='Author Name :'
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

FormCreateAuthor = reduxForm({
    form: 'formCreateAuthor',
    validate: AuthorValidation,
    enableReinitialize: true,
})(FormCreateAuthor)

export default connect()(FormCreateAuthor);