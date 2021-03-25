import React, { Component, Fragment } from 'react';
import Header from '../../../components/User/Header/Header';
import LocationUser from '../../../components/User/LocationUser/LocationUser';

class Location extends Component {
    render() {
        return (
            <Fragment>
                <Header />
                <LocationUser />
            </Fragment>
        )
    }
}

export default Location;