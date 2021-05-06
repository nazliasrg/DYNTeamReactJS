import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import axios from 'axios'
import OwlCarousel from 'react-owl-carousel'

var self = this;
class HomeCardPopular extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        };
    }

    componentDidMount = () => {
        this.getBooks()
    }

    getBooks = () => {
            axios.get('http://localhost:7070/api/dynteam/auth/user/getBookPopuler')
            .then(res => {
    
                var message = res.data.message;
                var status = res.data.status;
                var dataBook=[];
                if(status==200){
                    
                    const titleStyle = {
                        fontSize: "14px",
                        fontWeight: "bold",
                        textAlign: "center"
                    }
                    const cardStyle = {
                        width: "95%"
                    }
                    
                    res.data.data.map((item) => {
                        
                            var dataCover = item.bookEntity;
                            //6. untuk nambahin kompponen ke arraynya.  
                            var bookCover = 'http://localhost:7070/api/dynteam/book/cover/download/' + dataCover.cover;
                            //console.log(bookCover);
                            var book = {
                                coverName:dataCover.cover,
                                coverBook:bookCover,
                                title:dataCover.title,
                                author:dataCover.authorName
                            };
                            dataBook.push(book);
                    });
    
                }
               
                //7.Supaya listbooknya bisa ngrender ulang, utk isi list booknya (mkaanya butuh setState)
                console.log(dataBook);
                this.setState({
                    data: dataBook
                });
                
            })
            .catch(error => {
                console.log(error)
              
            })
    }

    render() {
        const { data } = this.state;

        const titleStyle = {
            fontSize: "14px",
            fontWeight: "bold",
            textAlign: "center"
        }
        const cardStyle = {
            width: "95%"
        }

        return (
            <>
                {
                    data.map((val) => {
                        return (
                            <div className='item'>
                                <Card style={cardStyle}>
                                    <Card.Img variant="top" src={val.coverBook} />
                                    <Card.Body style={{ textAlign: "center" }}>
                                        <Card.Title className="cardTitle" style={titleStyle}>{val.title}</Card.Title>
                                        <small className="text-muted">{val.author}</small>
                                    </Card.Body>
                                </Card>
                            </div>
                        )
                    })
                }

            </>
        )
    }
}

export default HomeCardPopular;
