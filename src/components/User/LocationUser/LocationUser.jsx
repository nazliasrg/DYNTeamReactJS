import React, { Component } from 'react'
import './LocationUser.css'

export default class LocationUser extends Component {
    render() {
        return (
            <>
                <div className="container">
                    <div className="location">
                        <div className="row justify-content-center">
                            <h2 className="pageTitle"> L&nbsp;O&nbsp;C&nbsp;A&nbsp;T&nbsp;I&nbsp;O&nbsp;N</h2>
                        </div>

                        <div className="container1">
                            <div className="gray2">
                                You can found us in <b>Perpustakaan Nasional Republik Indonesia</b>.
                            <br />
                                <div className="alamat">
                                    Jl. Medan Merdeka Sel. No.11, Gambir, Kecamatan Gambir, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10110
                            </div>
                            </div>

                            <div className="story">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15866.488857660224!2d106.8268717!3d-6.1812918!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x4ba58be40979fe36!2sPerpustakaan%20Nasional%20Republik%20Indonesia!5e0!3m2!1sid!2sid!4v1615871219411!5m2!1sid!2sid" width="600" height="450" style={{ border: "0" }} allowfullscreen="" loading="lazy"></iframe>
                            </div>

                        </div>

                    </div>
                </div>
            </>
        )
    }
}
