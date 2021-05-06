import React, { Component, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom';
import coverbook from '../../../assets/B001.jpeg';
import { ReactSession } from 'react-client-session';

//1. panggi; library axios
import axios from 'axios';
import { RiDatabaseFill } from 'react-icons/ri';

//2. untuk menampung class spy bisa dipanggil setelah respon axios
var self = this;
class ProfileOnProgress extends Component {
    constructor(){
        super();
        //3. Bikin variabel kosong list booknya pakai state
        this.state={listbook:[]}
        self = this;
    }
    //4. Dia harus didalam fungsi, ini kaya setelah load halaman, trs ini dimasukin ke sebuah fungsi
    componentDidMount() {
        
        //5. panggil web servicenya
        var userId = ReactSession.get("userId");
        axios.get('http://localhost:7070/api/dynteam/auth/user/getBook/1/' +userId)
        .then(res => {

            var message = res.data.message;
            var status = res.data.status;
            if(status==200){
                var i = 0;
                var data=[];
                res.data.data.map((item) => {
                    if(i<3)
                    {
                        var dataCover = item.bookEntity;
                        //6. untuk nambahin kompponen ke arraynya.  
                        var bookCover = 'http://localhost:7070/api/dynteam/book/cover/download/' + dataCover.cover;
                        data.push(
    
                            <div className="col-sm-3 mb-2">
                                <div className="card coverBook">
                                    <img src={bookCover} className="img-thumbnail" />
                                    <Button variant="primary">
                                        Information
                                    </Button>
                                </div>
                            </div>
                          )
                    }
                    i++;
                });

            }
           
            //7.Supaya listbooknya bisa ngrender ulang, utk isi list booknya (mkaanya butuh setState)
            self.setState({
                listbook: data
            });
            console.log(data);
            
        })
        .catch(error => {
            console.log(error)
          
        })

     }

    render() {
        return (
            <Fragment>

                <div className="container">
                    <div classname="row text-center">
                        <h2 className="pageTitle">
                            O&nbsp;N&nbsp;&nbsp;P&nbsp;R&nbsp;O&nbsp;G&nbsp;R&nbsp;E&nbsp;S&nbsp;S&nbsp;&nbsp;B&nbsp;O&nbsp;O&nbsp;K
                        </h2>
                    </div>
                    <div className="row mx-6 my-3" id="onprogressbook">

                        {this.state.listbook}
                        
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default ProfileOnProgress;