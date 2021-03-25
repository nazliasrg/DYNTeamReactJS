import React, { Component, Fragment } from 'react';

class Location extends Component {
    render(){
        return (
            <Fragment>
                <div id ="locationpage">
                <div className ="container">
                    <div className = "row">
                        <div className="row" style={{textAlign:'center'}}>
                        <h2 className="pageTitle"> L&nbsp;O&nbsp;C&nbsp;A&nbsp;T&nbsp;I&nbsp;O&nbsp;N</h2>
                        </div>
                    </div>
                </div>
                
                <div className="container1">
                    <div className="gray2">
                        You can found us in 
                        <br />
                        <strong>Perpustakaan Nasional Republik Indonesia</strong>.
                        <br />
                        <div className = "alamat">
                        Jl. Medan Merdeka Sel. No.11, Gambir, Kecamatan Gambir, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10110
                        </div>
                    </div>

                    <div className="story">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15866.488857660224!2d106.8268717!3d-6.1812918!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x4ba58be40979fe36!2sPerpustakaan%20Nasional%20Republik%20Indonesia!5e0!3m2!1sid!2sid!4v1615871219411!5m2!1sid!2sid"></iframe>

                    </div>
                </div>
                </div>

            </Fragment>
        )
    }
}

export default Location;