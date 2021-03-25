import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { Col, FormGroup, Row, Input, Label, Button } from 'reactstrap'
import AdminValidation from '../../../validations/Admin/AdminValidation'

const mapStateToProps = (state) => {
    return {
        initialValues: {
            no: state.adminRole.getAdminDetail.no,
            id_role: state.adminRole.getAdminDetail.id_role,
            username: state.adminRole.getAdminDetail.username,
            level: state.adminRole.getAdminDetail.level,
            status: state.adminRole.getAdminDetail.status
        }

    }
}

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

class FormEditAdmin extends Component {
    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <FormGroup row>
                    <Col md={6}>
                        <FormGroup>
                            <Field
                                type='text'
                                name='no'
                                component={renderField}
                                label='No :'
                            />
                        </FormGroup>
                    </Col>

                    <Col md={6}>
                        <FormGroup>
                            <Field
                                type='text'
                                name='id_role'
                                component={renderField}
                                label='ID Role :'
                            />
                        </FormGroup>
                    </Col>

                    <Col md={6}>
                        <FormGroup>
                            <Field
                                type='text'
                                name='username'
                                component={renderField}
                                label='Username :'
                            />
                        </FormGroup>
                    </Col>

                    <Col md={6}>
                        <FormGroup>
                            <Field
                                type='text'
                                name='level'
                                component={renderField}
                                label='Level :'
                            />
                        </FormGroup>
                    </Col>

                    <Col md={6}>
                        <FormGroup>
                            <Field
                                type='text'
                                name='status'
                                component={renderField}
                                label='Status :'
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
                                Edit
                            </Button>
                        </FormGroup>
                    </Col>
                </FormGroup>

            </form>
        )
    }
}

FormEditAdmin = reduxForm({
    form: 'formEditAdmin',
    validate: AdminValidation,
    enableReinitialize: true,
})(FormEditAdmin)

export default connect(mapStateToProps, null)(FormEditAdmin);