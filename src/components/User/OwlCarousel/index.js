import React, { Component, Fragment } from 'react';
// import './OwlCard.css';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'owl.carousel/dist/assets/owl.theme.default.min.css';

const OwlCard = (props) => {
    const {data } = props
    // console.log(data.title);
    return (
        <Fragment>
            <div className="container ">
                <OwlCarousel className="owl-theme"
                    loop
                    items="5"
                    autoplay>
                    {
                    data.map((val) =>{
                    // console.log(val.no)
                    // console.log(val.cover)
                    // console.log(val.title)
                    return(
                <div key= {val.no}>
                        <a href="">
                            <div className="card genre border-0 mx-3">
                                <img className="genre-pic" src={val.cover} alt="" />
                                <div className="card-body">
                                    <hr />
                                    <h5 >{val.title}</h5>
                                </div>
                            </div>
                        </a>
                    </div>
                    )
                })
            }
            </OwlCarousel>
            </div>
        </Fragment>
    );
}

export default OwlCard;