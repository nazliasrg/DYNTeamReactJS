import axios from 'axios';
import React, { Component } from 'react';
import { Fragment } from 'react';
import { ModalTitle } from 'react-bootstrap';
import { RiLockFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
// import cover from '../../../assets/book/B001.jpg'
// import './BookDetail.css';

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
            data:"",
            showModal: false,
            durationId: "0",
            userId:"3"
        }
    }

    componentDidMount(){
        const book_id=  this.props.match.params.bookId
        console.log(this.props);
        this.getDetailBook(book_id);
    }

    getDetailBook(book_id){
        axios.get(`http://localhost:7070/api/dynteam/book/${book_id}`).then(res =>{   
            console.log(res);
        this.setState({
            detailData: res.data,
            bookCode:res.data.bookCode,
            author: res.data.authorEntity,
            category: res.data.categoryEntity,
            publisher: res.data.publisherEntity
        })
        console.log(this.state.detailData);
        })
    }

    // useEffect(() => {
    //     var userId= ResactSession.get("userId");
    //     console.log(userId);
    //     axios.post('http://localhost:7070/api/dynteam/auth/user/' + userId).then(res =>{
    //         console.log(res.data);
    //     })
    //     .catch (error => {
    //         console.log(error);
    //     })
    // }, []);

    // INPUT KE DATABASAE DENGAN AXIOS.POST
    submitRequest = (e) => {
        e.preventDefault();
        
        const request ={
            userId: this.state.userId,
            bookCode: this.state.bookCode,
            durationId: this.state.durationId
        }
        console.log(request);
        
        axios.post('http://localhost:7070/api/dynteam/request/requestbook', request)
            .then(res => {
                console.log(res);
                // this.insertBook(res);
            })
            .catch(function (error){
                console.log(error);
            })
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
                                        <th scope="col">Author</th>
                                        <td>{authorName}</td>
                                    </tr>
                                    <tr>
                                        <th scope="col">Category</th>
                                        <td>{categoryName}</td>
                                    </tr>
                                    <tr>
                                        <th scope="col">Publisher</th>
                                        <td>{publisherName}</td>
                                    </tr>
                                    <tr>
                                        <th scope="col">Year</th>
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
            </Fragment>
        );
    }
}

export default BookDetail;