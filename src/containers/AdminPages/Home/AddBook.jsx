import React, { Component, Fragment } from 'react'
import { Container } from 'reactstrap'
import FormCreateBook from '../../../components/Admin/FormComponent/FormCreateBook'
import NavbarComponent from '../../../components/Admin/NavbarComponent/NavbarComponent'
import SidebarComponent from '../../../components/Admin/SidebarComponent/SidebarComponent'
import { connect } from 'react-redux'
import swal from 'sweetalert'
import { postBookCreate } from '../../../actions/BooksAction'

const mapStateToProps = (state) => {
    return {
        getResponDataBook: state.books.getResponDataBook,
        errorResponDataBook: state.books.errorResponDataBook
    }
}

class AddBook extends Component {
    handleSubmit = (data) => {
        this.props.dispatch(postBookCreate(data))
    }
    render() {

        if (this.props.getResponDataBook || this.props.errorResponDataBook) {
            if (this.props.errorResponDataBook) {
                swal("Failed!", this.props.errorResponDataBook, "error")
            }
            else {
                swal("Book Added!", this.props.getResponDataBook.title, "success")
                    .then((value) => {

                        const { history } = this.props;
                        history.push('/home-admin');
                    });
            }
        }


        return (
            <Fragment>
                <div className="wrapper">
                    <SidebarComponent />
                    <div id="content">
                        <NavbarComponent />

                        <div className="card shadow mb-4">
                            <Container>
                                <h6 className='mt-3'>Add Book</h6>
                                <FormCreateBook onSubmit={(data) => this.handleSubmit(data)} />
                            </Container>
                        </div>

                    </div>
                </div>
            </Fragment>
        )
    }
}

export default connect(mapStateToProps, null)(AddBook)
