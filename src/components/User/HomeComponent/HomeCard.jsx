import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import axios from 'axios'
import OwlCarousel from 'react-owl-carousel'


class HomeCard extends Component {
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
        axios.get('https://605c7cdc6d85de00170da562.mockapi.io/book')
            .then(res => {
                this.setState({
                    data: res.data
                })
                console.log(this.state.data);
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
                                    <Card.Img variant="top" src={`../img/book/${val.id_book}.jpg`} />
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

export default HomeCard;