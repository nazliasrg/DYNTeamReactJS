import React, { Component, Fragment } from "react";
import GenreCard from '../../../components/User/GenereCard';
import Footer from '../../../components/User/Footer/Footer';
import Header from '../../../components/User/Header/Header';

class GenrePage extends Component{
    render(){
        return(
            <Fragment>
                <Header/>                
                <GenreCard />
                {/* <Footer /> */}
            </Fragment>
        );
    }
}

export default GenrePage;