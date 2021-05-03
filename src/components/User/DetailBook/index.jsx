import axios from 'axios';
import React, { Component } from 'react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
// import cover from '../../../assets/book/B001.jpg'
// import './BookDetail.css';

class BookDetail extends Component{
    constructor(){
        super();
        this.state={
            detailData:{},
            author:{},
            category:{},
            publisher:{},
            book_id: "",
            data:"",
            showModal: false
        }
    }

    componentDidMount(){
        const book_id=  this.props.match.params.bookId
        console.log(book_id);
        this.getDetailBook(book_id);
    }

    getDetailBook(book_id){
        axios.get(`http://localhost:7070/api/dynteam/book/${book_id}`).then(res =>{   
            console.log(res);
        this.setState({
                detailData: res.data,
                author: res.data.authorEntity,
                category: res.data.categoryEntity,
                publisher: res.data.publisherEntity
            })
            console.log(this.state.detailData);
        })
    }


    getCover = () =>{
            axios.get(`http://localhost:7070/api/dynteam/book/cover/download/${this.state.detailData.cover}`).then(res =>{
                this.setState({
                    data: res.data
                })
                console.log(this.state.data);
            })
        }


    handleClose = () => {
        this.setState({
            showModal: false
        });
    }


    handleShow = () => {
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
                            <img className="img-fluid mt-3" src={cover} alt=""/>
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
                                <button className="mt-3" onClick={this.handleShow}>Rent book</button>
                            </div>
                            <div>
                                <Link to={`/Genre`}>
                                    <button className="mt-3">Kembali</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>Modal body text goes here.</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            </Fragment>
        );
    }
}

export default BookDetail;