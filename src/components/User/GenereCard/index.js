import React, {Fragment} from 'react';
import './GenreCard.css'
import Novel from '../../../assets/book/B001.jpg';
import Comic from '../../../assets/book/B005.jpg';
import Romance from '../../../assets/book/B009.jpg';
import Travel from '../../../assets/book/B014.jpg';
import History from '../../../assets/book/B013.jpg';
import Personal from '../../../assets/book/B004.jpg';
import Computer from '../../../assets/book/B002.jpg';
import Business from '../../../assets/book/B017.jpg';

const GenreCard= () =>{
    return(
        <Fragment>
            <div className="container">
                <div className="row d-flex justify-content-center col-md-12" style={{height: '60px'}}>
                    <h4 className="title">B&nbsp;O&nbsp;O&nbsp;K&nbsp;S&nbsp; G&nbsp;E&nbsp;N&nbsp;R&nbsp;E&nbsp;</h4>
                </div>
                <div className="row">
                    <div className="d-flex justify-content-center col-12">
                        <a href="#" className="col-2.5"><div className="card border-0 mx-3">
                            <img className="genre-pic" src={Novel} alt=""/>
                            <div class="card-body">
                                <hr/>
                                <h5>Novel</h5>
                            </div>
                        </div></a>
                        <a href="#" className="col-2.5"><div className="card border-0 mx-3">
                            <img className="genre-pic" src={Comic} alt=""/>
                            <div class="card-body">
                                <hr/>
                                <h5>Comic Fantasy</h5>
                            </div>
                        </div></a>
                        <a href="#"><div className="card border-0 mx-3">
                            <img className="genre-pic" src={Romance} alt=""/>
                            <div class="card-body">
                                <hr/>
                                <h5>Romance</h5>
                            </div>
                        </div></a>
                        <a href="#"><div className="card border-0 mx-3">
                            <img className="genre-pic" src={Travel} alt=""/>
                            <div class="card-body">
                                <hr/>
                                <h5>Travel</h5>
                            </div>
                        </div></a>
                    </div>
                </div>
                <div className="row border-0 mt-4">
                    <div className="d-flex flex-row justify-content-center col-md-12">
                        <a href="#"><div className="card border-0 mx-3">
                            <img className="genre-pic" src={History} alt=""/>
                            <div class="card-body">
                                <hr/>
                                <h5>History</h5>
                            </div>
                        </div></a>
                        <a href="#"><div className="card border-0 mx-3">
                            <img className="genre-pic" src={Personal} alt=""/>
                            <div class="card-body">
                                <hr/>
                                <h5>Personal Development</h5>
                            </div>
                        </div></a>
                        <a href="#"><div className="card border-0 mx-3">
                            <img className="genre-pic" src={Computer} alt=""/>
                            <div class="card-body">
                                <hr/>
                                <h5>Computer & Tech</h5>
                            </div>
                        </div></a>
                        <a href="#"><div className="card border-0 mx-3">
                            <img className="genre-pic" src={Business} alt=""/>
                            <div class="card-body">
                                <hr/>
                                <h5>Business</h5>
                            </div>
                        </div></a>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default GenreCard;