import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { Col, FormGroup, Row, Input, Label, Button } from 'reactstrap'
import BookValidation from '../../../validations/Admin/BookValidation'

const mapStateToProps = (state) => {
    return {
        initialValues: {
            id_book: state.books.getBookDetail.id_book,
            cover: state.books.getBookDetail.cover,
            category: state.books.getBookDetail.category,
            title: state.books.getBookDetail.title,
            author: state.books.getBookDetail.author,
            publisher: state.books.getBookDetail.publisher,
            year: state.books.getBookDetail.year,
            stock: state.books.getBookDetail.stock
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

class FormEditBook extends Component {
    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <FormGroup row>

                    <Col md={6}>
                        <FormGroup>
                            <Field
                                type='text'
                                name='id_book'
                                component={renderField}
                                label='ID Book :'
                            />
                        </FormGroup>
                    </Col>

                    <Col md={6}>
                        <FormGroup>
                            <Field
                                type='text'
                                name='cover'
                                component={renderField}
                                label='Cover :'
                            />
                        </FormGroup>
                    </Col>

                    <Col md={6}>
                        <FormGroup>
                            <Field
                                type='text'
                                name='category'
                                component={renderField}
                                label='Category :'
                            />
                        </FormGroup>
                    </Col>

                    <Col md={6}>
                        <FormGroup>
                            <Field
                                type='text'
                                name='title'
                                component={renderField}
                                label='Title :'
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Field
                                type='text'
                                name='author'
                                component={renderField}
                                label='Author :'
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Field
                                type='text'
                                name='publisher'
                                component={renderField}
                                label='Publisher :'
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Field
                                type='number'
                                name='year'
                                component={renderField}
                                label='Year :'
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Field
                                type='number'
                                name='stock'
                                component={renderField}
                                label='Stock :'
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

FormEditBook = reduxForm({
    form: 'formEditBook',
    validate: BookValidation,
    enableReinitialize: true,
})(FormEditBook)

export default connect(mapStateToProps, null)(FormEditBook);