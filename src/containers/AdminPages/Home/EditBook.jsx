import React, { Component, Fragment } from 'react'
import NavbarComponent from '../../../components/Admin/NavbarComponent/NavbarComponent'
import SidebarComponent from '../../../components/Admin/SidebarComponent/SidebarComponent'
import { connect } from 'react-redux'
import swal from 'sweetalert'
import { getBookDetail } from '../../../actions/BooksAction'
import { Container } from 'reactstrap'
import FormEditBook from '../../../components/Admin/FormComponent/FormEditBook'

class EditBook extends Component {
    componentDidMount() {
        this.props.dispatch(getBookDetail(this.props.match.params.no))
        console.log(getBookDetail("id: " + this.props.match.params.no))
    }

    render() {
        if (this.props.getResponDataBook) {
            swal("Book Updated!", this.props.getResponDataBook.title, "success")
                .then((value) => {
                    const { history } = this.props;
                    history.push('/home-admin');
                });
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

export default connect()(EditBook)
