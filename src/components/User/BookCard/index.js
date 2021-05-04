import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import './BookCard.css';

const BookCard = (props) =>{ // "props" DIGUNAKAN HANYA UNTUK MENGIRIM DATA. TIDAK BISA MENGUBAH DATA

    const {title, book_id, cover} = props;
    return(
        <div className="d-flex flex-column container-card">
            <div className="d-flex justify-content-center align-items-end img-container">
                <div className="pic-container">
                    <img className="img-thumbnail" src={`http://localhost:7070/api/dynteam/book/cover/download/${cover}`} alt=""/>
                </div>
            </div>
            <div className="title-container">
                <p>{title}</p>
            </div>
            {/* <div className="author-container">
                <p>{author}</p>
            </div> */}
            <div className="d-flex button-bar">
                <a className="tombol text-center" type="button">
                    <Link to={`detail/${book_id}`}>
                        <p>Detail</p>
                    </Link>
                </a>
            </div>
        </div>
    );
}

export default BookCard;