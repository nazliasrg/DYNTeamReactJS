import React, { Component, Fragment } from 'react'
import NavbarComponent from '../../../../components/Admin/NavbarComponent/NavbarComponent'
import SidebarComponent from '../../../../components/Admin/SidebarComponent/SidebarComponent'
import { connect } from 'react-redux'
import { Container } from 'reactstrap'
import FormCreateCategory from '../../../../components/Admin/FormComponent/FormCreateCategory'

class EditCategory extends Component {
    constructor() {
        super();
        this.state = {
            detailCategory: {},
            categoryId: 0
        }
    }
    componentDidMount() {
        this.setState({
            categoryId: this.props.match.params.categoryId
        })
        console.log(this.state.categoryId);
        this.getDetailCategory(this.state.categoryId);
    }

    getDetailCategory = (id) => {
        // axios.get('https://605c7cdc6d85de00170da562.mockapi.io/book/' + id)
        //     .then(res => {
        //         this.setState({
        //             detailBook: res.data
        //         })
        //         console.log(this.state.detailBook);
        //     })
    }

    render() {
        const categoryId = this.state.categoryId;

        return (
            <Fragment>
                <div className="wrapper">
                    <SidebarComponent />
                    <div id="content">
                        <NavbarComponent />

                        <div className="card shadow mb-4">
                            <Container>
                                <h6 className='mt-3'>Edit Category {categoryId}</h6>
                                <FormCreateCategory />
                            </Container>
                        </div>

                    </div>
                </div>
            </Fragment>
        )
    }
}

export default connect()(EditCategory)
