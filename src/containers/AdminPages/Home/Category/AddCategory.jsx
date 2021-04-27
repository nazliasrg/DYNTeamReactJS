import React, { Component, Fragment } from 'react'
import NavbarComponent from '../../../../components/Admin/NavbarComponent/NavbarComponent'
import SidebarComponent from '../../../../components/Admin/SidebarComponent/SidebarComponent'
import { connect } from 'react-redux'
import { Container } from 'reactstrap'
import FormCreateCategory from '../../../../components/Admin/FormComponent/FormCreateCategory'

class AddCategory extends Component {

    render() {
        return (
            <Fragment>
                <div className="wrapper">
                    <SidebarComponent />
                    <div id="content">
                        <NavbarComponent />

                        <div className="card shadow">
                            <Container>
                                <h6>Add Category</h6>
                                <FormCreateCategory />
                            </Container>
                        </div>

                    </div>
                </div>
            </Fragment>
        )
    }
}


export default connect()(AddCategory)