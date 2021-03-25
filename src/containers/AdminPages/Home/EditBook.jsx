import React, { Component, Fragment } from 'react'
import NavbarComponent from '../../../components/Admin/NavbarComponent/NavbarComponent'
import SidebarComponent from '../../../components/Admin/SidebarComponent/SidebarComponent'
import { connect } from 'react-redux'
import swal from 'sweetalert'
import { postBookCreate } from '../../../actions/BooksAction'
import { Container } from 'reactstrap'
import FormEditBook from '../../../components/Admin/FormComponent/FormEditBook'

const mapStateToProps = (state) => {
    return {
        getResponDataBook: state.books.getResponDataBook,
        errorResponDataBook: state.books.errorResponDataBook
    }
}

class EditBook extends Component {
    handleSubmit = (data) => {
        this.props.dispatch(postBookCreate(data))
    }
    render() {
        if (this.props.getResponDataAdmin) {
            swal("Book Updated!", this.props.getResponDataBook.name, "success")
        }
        return (
            <Fragment>
                <div className="wrapper">
                    <SidebarComponent />
                    <div id="content">
                        <NavbarComponent />

                        <div className="card shadow mb-4">
                            <Container>
                                <h6 className='mt-3'>Edit Book</h6>
                                <FormEditBook />
                            </Container>
                        </div>

                    </div>
                </div>
            </Fragment>
        )
    }
}

export default connect(mapStateToProps, null)(EditBook)
