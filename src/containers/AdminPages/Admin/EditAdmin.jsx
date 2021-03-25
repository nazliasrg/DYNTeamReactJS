import React, { Component, Fragment } from 'react'
import NavbarComponent from '../../../components/Admin/NavbarComponent/NavbarComponent'
import SidebarComponent from '../../../components/Admin/SidebarComponent/SidebarComponent'
import { Container } from 'reactstrap'
import { connect } from 'react-redux'
import { getAdminDetail } from '../../../actions/AdminAction'
import FormEditAdmin from '../../../components/Admin/FormComponent/FormEditAdmin'

class EditAdmin extends Component {

    componentDidMount() {
        this.props.dispatch(getAdminDetail(this.props.match.params.no))
        console.log(getAdminDetail(this.props.match.params.no))
    }

    render() {
        return (
            <Fragment>
                <div className="wrapper">
                    <SidebarComponent />
                    <div id="content">
                        <NavbarComponent />
                        <div className="card shadow mb-4">
                            <Container>
                                <h6 className='mt-4'>Edit Admin</h6>
                                <FormEditAdmin />
                            </Container>
                        </div>

                    </div>
                </div>
            </Fragment>
        )
    }
}

export default connect()(EditAdmin)
