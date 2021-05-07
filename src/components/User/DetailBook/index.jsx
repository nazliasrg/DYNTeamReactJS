import axios from 'axios';
import React, { Component } from 'react';
import { Fragment } from 'react';
import { ModalTitle } from 'react-bootstrap';
import { ReactSession } from 'react-client-session';
import { Link } from 'react-router-dom';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import {NotificationContainer, NotificationManager} from 'react-notifications';
// import cover from '../../../assets/book/B001.jpg'
import './DetailBook.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

// BUAT REACT SESSION UNTUK MENGGAMBIL DATA USER YANG SUDAH

class BookDetail extends Component{
    constructor(){
        super();
        this.state={
            detailData:[],
            author:{},
            category:{},
            publisher:{},
            book_id: "",
            bookCode:"",
            stock:"",
            data:"",
            showModal: false,
            durationId: "0",
            isAvailable:"",
            userId:"",
            saldoUser:"",
        }
    }

    authHeader = () => {
        const user = JSON.parse(localStorage.getItem('data_user'));
        console.log(user)
        
        if (user && user.data.token) {
            return {
                'authorization': `Bearer ${user.data.token}`,
                'userId' : `${user.data.userId}`
            }
        }
        else {
            return null;
        }
    }

    async componentDidMount(){
        await this.authHeader();
        await console.log(this.authHeader().userId);
        const book_id=  await this.props.match.params.bookId
        await console.log(this.props);
        await this.getDetailBook(book_id);
        await console.log("data_user");
        await console.log(JSON.parse(localStorage.getItem("data_user")));
        await this.getuser();
    }

    getuser(){
        const userid= this.authHeader().userId;
        axios.get('http://localhost:7070/api/dynteam/auth/user/' + userid).then(res =>{
            console.log(res.data.saldoUser);
            this.setState({
                saldoUser: res.data.saldoUser
            })
        })
    }

    getDetailBook(book_id){
        const user = this.authHeader();
        axios.get(`http://localhost:7070/api/dynteam/book/${book_id}`,{
            headers: user
        }).then(res =>{   
            console.log(res);
        this.setState({
            detailData: res.data,
            bookCode:res.data.bookCode,
            author: res.data.authorEntity,
            category: res.data.categoryEntity,
            publisher: res.data.publisherEntity,
            stock: res.data.stock,
            isAvailable: res.data.isAvailable
        })
        console.log(this.state.stock);
        })
    }


    // INPUT KE DATABASAE DENGAN AXIOS.POST
    submitRequest = (e) => {
        const user = this.authHeader();
        e.preventDefault();
        
        const request ={
            userId: user.userId,
            bookCode: this.state.bookCode,
            durationId: this.state.durationId
        }
        console.log(request);

        if(request.durationId == 0){
            NotificationManager.error("Please choose duration");
        }else if(this.state.saldoUser == 0){
            NotificationManager.error("Your Saldo is right now is Rp.0 Please top up your saldo.");
        }else if(request.durationId == 1 && this.state.saldoUser < 3000 || request.durationId == 2 && this.state.saldoUser < 7000){
            NotificationManager.error("Your saldo is not enough for this duration, please top up your saldo or change your duration.");
        }else if(this.state.isAvailable == 0){
            NotificationManager.error("We are so sorry this book is not available.");
        }
        else{
            axios.post('http://localhost:7070/api/dynteam/request/requestbook', request, {
                headers:user
            })
            .then(res => {
                console.log(res);
                if(res.data == "peminjaman berhasil"){
                    NotificationManager.success("Thank you for rent this book, we'll let you know if this book is ready.");
                }
                this.setState({
                    showModal: false
                })                
            })
            .catch(function (error){
                console.log(error);
            })
        }
    }


    // MENDAPATKAN DURASI PEMINJAMAN
    formChange = (e)=>{
        // console.log(e.target.value);
        this.setState({
            durationId: e.target.value
        })
    }


    // UNTUK MENUTUP MODAL PEMINJALAN BUKU
    closeModal = () => {
        this.setState({
            showModal: false
        });
    }


    // UNTUK MEMBUKA MODAL PEMINJAMAN
    openModal = () => {
        this.setState({
            showModal: true
        });
    }


    render(){        
        document.body.style.backgroundColor = "rgb(214, 214, 214)";
        const {cover, title, synopsis, year} = this.state.detailData;
        const {authorName} = this.state.author;
        const {categoryName} = this.state.category;
        const {publisherName} = this.state.publisher;
        return(
            <Fragment>
            <Header/>
            <div className="container detail-book-container">
                <div className="row">
                    <div className="col-md-4 col-12 cover-container">
                        <div className="cover-container">
                            <img className="img-fluid mt-3" src={`http://localhost:7070/api/dynteam/book/cover/download/${cover}`} alt=""/>
                        </div>
                        <div>
                            <table className="table table-striped mt-2">
                                <thead>
                                    <tr>
                                        <td scope="col"><b>Author</b></td>
                                        <td>{authorName}</td>
                                    </tr>
                                    <tr>
                                        <td scope="col"><b>Category</b></td>
                                        <td>{categoryName}</td>
                                    </tr>
                                    <tr>
                                        <td scope="col"><b>Publisher</b></td>
                                        <td>{publisherName}</td>
                                    </tr>
                                    <tr>
                                        <td scope="col"><b>Year</b></td>
                                        <td>{year}</td>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                    <div className="col-md-8 col-12">
                        <div className="book-title text-center">
                            <p>{title}</p>
                        </div>
                        <hr/>
                        <div className="book-synopsis">
                            <p>{synopsis}</p>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div>
                                <button className="mt-3" onClick={this.openModal}>Rent Book</button>
                            </div>
                            <div>
                                <Link to={`/Genre`}>
                                    <button className="mt-3">Back to Catalogue</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

            <Modal isOpen={this.state.showModal}>
                <ModalHeader>
                    <ModalTitle className="text-center">
                        Rent Book
                    </ModalTitle>
                </ModalHeader>

                <ModalBody>
                    <p>
                        Title book: {title} <br/>
                        Author: {authorName}
                    </p>

                    <p>
                        Please input days you want to rent this book <br/>
                        <small>
                            *Cost Rp. 1.000 per day
                        </small>
                    </p>
                    <select name="day" id="days" value={this.state.durationId} onChange={this.formChange}>
                        <option value="0">choose days</option>
                        <option value="1">3 days</option>
                        <option value="2">7 days</option>
                    </select>
                </ModalBody>

                <ModalFooter>
                    <button onClick={this.submitRequest}>Rent this Book</button>
                    <button onClick={this.closeModal}>Close</button>
                </ModalFooter>
            </Modal>
            <NotificationContainer />
            </Fragment>
        );
    }
}

export default BookDetail;