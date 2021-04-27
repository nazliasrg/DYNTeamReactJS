import React, { Component, Fragment } from 'react'
import NavbarComponent from '../../../../components/Admin/NavbarComponent/NavbarComponent'
import SidebarComponent from '../../../../components/Admin/SidebarComponent/SidebarComponent'
import { connect } from 'react-redux'
import { Container } from 'reactstrap'
import FormCreateAuthor from '../../../../components/Admin/FormComponent/FormCreateAuthor'

class AddAuthor extends Component {

    handleSubmit = (data) => {

    }

    render() {
        return (
            <Fragment>
                <div className="wrapper">
                    <SidebarComponent />
                    <div id="content">
                        <NavbarComponent />

                        <div className="card shadow">
                            <Container>
                                <h6>Add Author</h6>
                                <FormCreateAuthor onSubmit={(data) => this.handleSubmit(data)} />
                            </Container>
                        </div>

                    </div>
                </div>
            </Fragment>
        )
    }
}


export default connect()(AddAuthor)
