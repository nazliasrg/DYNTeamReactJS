import React, { Component, Fragment } from 'react'
import CarouselHome from '../../../components/User/CarouselHome/CarouselHome'
import Header from '../../../components/User/Header/Header'
import SearchBar from '../../../components/User/SearchBar/SearchBar'
import 'bootstrap/dist/css/bootstrap.min.css'
import Recommended from '../../../components/User/HomeComponent/Recommended'
import Popular from '../../../components/User/HomeComponent/Popular'

export default class HomeUser extends Component {

    authHeader = () => {
        const user = JSON.parse(localStorage.getItem('data_user'));
        console.log(user)

        if (user && user.data.token) {
            return {
                'authorization': `Bearer ${user.data.token}`
            }
        }
        else {
            return null;
        }
    }


    async componentDidMount() {
        await this.authHeader();
        await console.log("user")
        await console.log(localStorage.getItem('data_user'))
    }

    render() {
        return (
            <Fragment>
                <Header />
                <CarouselHome />
                <SearchBar />
                <Recommended />
                <Popular />
            </Fragment>
        )
    }
}
