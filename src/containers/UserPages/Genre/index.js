import axios from "axios";
import { Button } from "bootstrap";
import { data } from "jquery";
import React, { Component, Fragment } from "react";
import { FormGroup } from "react-bootstrap";
import { ReactSession } from "react-client-session";
import ReactPaginate from 'react-paginate';
import { Input, Label } from "reactstrap";
import BookCard from '../../../components/User/BookCard';
import DropDown from "../../../components/User/DropDownFilter";
import Footer from '../../../components/User/Footer/Footer';
import Header from '../../../components/User/Header/Header';
import SearchBoxCatalogue from "../../../components/User/SearchBarCatalogue";
// import { useHistory } from "react-router-dom";
import './Catalogue.css';

ReactSession.setStoreType("localStorage");

class GenrePage extends Component{
    constructor(){
        // MENGAMBIL SIFAT DARI PARENT. CLASS GENREPAGE INI MERUPAKAN CHILD DARI COMPONENT
        // KARENA CLASS INI MENG-"EXTENDS" COMPONENT.
        super();
        
        // MEMBUAT STATE DIDALAM CONTRUCTOR
        this.state = {
            data: [], // TEMPAT MENYIMPAN DATA BUKU YANG DIAMBIL DENGAN AXIOS.GET
            Searchbook: "",
            offset: 0,
            perPage: 8,
            currentPage: 0,
        }
        this.handlePageClick = this
        .handlePageClick
        .bind(this);
    }

    // MENDAPATKAN HEADER DI CATALOGUE PAGE
    authHeader = () => {
        const user = JSON.parse(localStorage.getItem('data_user'));
        console.log(user)
        
        if (user && user.data.token) {
            return {
                'authorization': `Bearer ${user.data.token}`
            }
        }
        else {
            return null;
        }
    }

    async componentDidMount(){
        // MENGGUNAKAN PENGKONDISIAN SUPAYA TIDAK DAPAT KEMBALI KEHALAMAN YANG SEBELUMNYA JIKA TIDAK LOGIN TERLEBIH DAHULU
        if (this.authHeader()==null){
            this.props.history.push('/')
        }
        // await this.authHeader();
        await this.getBook();
        await console.log("data_user");
        await console.log(JSON.parse(localStorage.getItem("data_user")));
    }

    handleInput = (e) =>{
        // MENGETAHUI APAKAH DATA YANG KITA MASUKAN DITERIMA ATAU TIDAK
        // console.log(e.target.value); 
        // const update = this.state.data;
        // update = update.filter()
        this.setState({Searchbook: e.target.value})
    }

    getBook = () =>{
        const user = this.authHeader();
        axios.get('http://localhost:7070/api/dynteam/book/active-books', {
            headers: user
        }).then(res =>{
            
            // const data = res.data;
            // const slice = data.slice(this.state.offset, this.state.offset+this.state.perPage)
            // const postData = slice.map(val =>
            //     <BookCard
            //         key = {val.bookId}
            //         book_id = {val.bookId}
            //         book_code = {val.bookCode} 
            //         cover = {val.cover}
            //         title = {val.title}
            //         isAvailable = {val.isAvailable}
            //         author = {val.authorEntity.authorName}
            //     />)
            
            this.setState({
                data: res.data,
                pageCount: Math.ceil(res.data.length / this.state.perPage),
            })
            console.log(this.state.data);
        })
    }

    handlePageClick = (e) =>{
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () =>{
            this.getBook()
        });
    };

    
    
    render(){
        const {Searchbook, postData ,data} = this.state;
        // MENAMPILKAN BUKU YANG SESUAI DENGAN KALIMAT YANG KITA INPUTKAN
        const titleToLowerCaseFilter = Searchbook.toLowerCase();
        const filterbooks = data.filter((buku) =>{ 
            return buku.title.toLowerCase().includes(Searchbook.toLowerCase()) 
        }).slice(this.state.offset, this.state.offset+this.state.perPage)
        return(
            <Fragment>
                <Header/>
                <div className="container-fluid catalogue-container">
                    <div className="row justify-content-center">
                        <div className="col-auto catalogue-title">
                            <p>Book Catalogue</p>
                            <p>Book Catalogue</p>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-sm-auto mb-4">
                            <SearchBoxCatalogue handleInput={this.handleInput} />
                        </div>
                    </div>
                    <div className="d-flex flex-row flex-wrap justify-content-center">
                        {
                            // diubah dari data.map jadi filterbooks supaya saat mencari buku dapat tertampil. map digunakan untuk memanggil data yang ada di dalam database
                            filterbooks.map((val) => { 
                                console.log(val.authorEntity.authorName);
                                return(
                                    <BookCard
                                        key = {val.bookId}
                                        book_id = {val.bookId}
                                        book_code = {val.bookCode} 
                                        cover = {val.cover}
                                        title = {val.title}
                                        isAvailable = {val.isAvailable}
                                        author = {val.authorEntity.authorName}
                                    />
                                    
                                )
                            })
                        }
                        {/* {this.state.postData} */}
                    </div>
                    <div>
                        <ReactPaginate
                                previousLabel={"prev"}
                                nextLabel={"next"}
                                breakLabel={"..."}
                                breakClassName={"break-me"}
                                pageCount={this.state.pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={this.handlePageClick}
                                containerClassName={"pagination"}
                                subContainerClassName={"pages pagination"}
                                activeClassName={"active"}
                        />
                    </div>
                </div>
                <Footer />
            </Fragment>
        );
    }
}

export default GenrePage;