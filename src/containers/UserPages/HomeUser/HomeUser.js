import React, { Component, Fragment } from 'react'
import CarouselHome from '../../../components/User/CarouselHome/CarouselHome'
import Header from '../../../components/User/Header/Header'
import SearchBar from '../../../components/User/SearchBar/SearchBar'
import 'bootstrap/dist/css/bootstrap.min.css'
import Recommended from '../../../components/User/HomeComponent/Recommended'
import Popular from '../../../components/User/HomeComponent/Popular'

export default class HomeUser extends Component {
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
