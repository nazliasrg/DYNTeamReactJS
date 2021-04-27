import React, { Component, Fragment } from 'react'
import NavbarComponent from '../../../../components/Admin/NavbarComponent/NavbarComponent'
import SidebarComponent from '../../../../components/Admin/SidebarComponent/SidebarComponent'
import { connect } from 'react-redux'
import { Container } from 'reactstrap'
import FormCreatePublisher from '../../../../components/Admin/FormComponent/FormCreatePublisher'

class EditPublisher extends Component {
    constructor() {
        super();
        this.state = {
            detailPublisher: {},
            publisherId: 0
        }
    }
    componentDidMount() {
        this.setState({
            publisherId: this.props.match.params.publisherId
        })
        console.log(this.state.publisherId);
        this.getDetailPublisher(this.state.publisherId);
    }

    getDetailPublisher = (id) => {
        // axios.get('https://605c7cdc6d85de00170da562.mockapi.io/book/' + id)
        //     .then(res => {
        //         this.setState({
        //             detailBook: res.data
        //         })
        //         console.log(this.state.detailBook);
        //     })
    }

    render() {
        const publisherId = this.state.publisherId;

        return (
            <Fragment>
                <div className="wrapper">
                    <SidebarComponent />
                    <div id="content">
                        <NavbarComponent />

                        <div className="card shadow mb-4">
                            <Container>
                                <h6 className='mt-3'>Edit Publisher {publisherId}</h6>
                                <FormCreatePublisher />
                            </Container>
                        </div>

                    </div>
                </div>
            </Fragment>
        )
    }
}

export default connect()(EditPublisher)
