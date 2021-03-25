import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { Col, FormGroup, Row, Input, Label, Button } from 'reactstrap'
import UserValidation from '../../../validations/Admin/UserValidation'

const mapStateToProps = (state) => {
    return {
        initialValues: {
            no: state.users.getUserDetail.no,
            id_user: state.users.getUserDetail.id_user,
            name: state.users.getUserDetail.name,
            email: state.users.getUserDetail.email,
            phone_number: state.users.getUserDetail.phone_number,
            member: state.users.getUserDetail.member,
            status: state.users.getUserDetail.status
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

class FormEditUser extends Component {
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
                                name='id_user'
                                component={renderField}
                                label='ID User :'
                            />
                        </FormGroup>
                    </Col>

                    <Col md={6}>
                        <FormGroup>
                            <Field
                                type='text'
                                name='name'
                                component={renderField}
                                label='Name :'
                            />
                        </FormGroup>
                    </Col>

                    <Col md={6}>
                        <FormGroup>
                            <Field
                                type='email'
                                name='email'
                                component={renderField}
                                label='Email :'
                            />
                        </FormGroup>
                    </Col>

                    <Col md={6}>
                        <FormGroup>
                            <Field
                                type='text'
                                name='phone_number'
                                component={renderField}
                                label='Phone Number :'
                            />
                        </FormGroup>
                    </Col>

                    <Col md={6}>
                        <FormGroup>
                            <Field
                                type='text'
                                name='member'
                                component={renderField}
                                label='Member :'
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

FormEditUser = reduxForm({
    form: 'formEditUser',
    validate: UserValidation,
    enableReinitialize: true,
})(FormEditUser)

export default connect(mapStateToProps, null)(FormEditUser);