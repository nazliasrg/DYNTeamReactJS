import axios from "axios";
import { Button } from "bootstrap";
import React, { Component, Fragment } from "react";
import BookCard from '../../../components/User/BookCard';
import DropDown from "../../../components/User/DropDownFilter";
import Footer from '../../../components/User/Footer/Footer';
import Header from '../../../components/User/Header/Header';
import SearchBoxCatalogue from "../../../components/User/SearchBarCatalogue";
import './Catalogue.css';

class GenrePage extends Component{
    constructor(){
        // MENGAMBIL SIFAT DARI PARENT. CLASS GENREPAGE INI MERUPAKAN CHILD DARI COMPONENT
        // KARENA CLASS INI MENG-"EXTENDS" COMPONENT.
        super();
        
        // MEMBUAT STATE DIDALAM CONTRUCTOR
        this.state = {
            data: [], // TEMPAT MENYIMPAN DATA BUKU YANG DIAMBIL DENGAN AXIOS.GET
            Searchbook: ""
        }
    }

    componentDidMount(){
        this.getBook();
    }

    getBook = () =>{
        axios.get('http://localhost:7070/api/dynteam/book/books').then(res =>{
            this.setState({
                data: res.data
            })
            console.log(this.state.data);
        })
    }

    handleInput = (e) =>{
        // MENGETAHUI APAKAH DATA YANG KITA MASUKAN DITERIMA ATAU TIDAK
        // console.log(e.target.value); 
        this.setState({Searchbook: e.target.value})
    }
    
    render(){
        const {Searchbook, data} = this.state;
        // MENAMPILKAN BUKU YANG SESUAI DENGAN KALIMAT YANG KITA INPUTKAN
        let filterbooks = data.filter((buku) =>{ 
            return buku.title.toLowerCase().includes(Searchbook.toLowerCase()) 
        })
        return(
            <Fragment>
                <div className="container-fluid catalogue-container">
                    <div className="row justify-content-center">
                        <div className="col-auto catalogue-title">
                            <p>Book Catalogue</p>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-sm-auto">
                            {/* <DropDown/> */}
                        </div>
                        <div className="col-sm-auto">
                            <SearchBoxCatalogue handleInput={this.handleInput} />
                        </div>
                    </div>
                    <div className="d-flex flex-row flex-wrap justify-content-center">
                        {
                            // diubah dari data.map jadi filterbooks supaya saat mencari buku dapat tertampil. map digunakan untuk memanggil data yang ada di dalam database
                            filterbooks.map((val) => { 
                                // console.log(val.cover);
                                return(
                                    <BookCard
                                        key = {val.bookId}
                                        book_id = {val.bookId}
                                        book_code = {val.bookCode} 
                                        cover = {val.cover}
                                        title = {val.title}
                                        // author = {val.author}
                                    />
                                    
                                )
                            })
                        }
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default GenrePage;