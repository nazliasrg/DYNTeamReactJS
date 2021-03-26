import React, { Component } from 'react'
import { Card, Container, Row } from 'react-bootstrap'
import './Recommended.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class Recommended extends Component {
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
        return (
            <>
                <Container>
                    <Row className="justify-content-center">
                        <h2 className="pageTitle">R&nbsp;E&nbsp;C&nbsp;O&nbsp;M&nbsp;M&nbsp;E&nbsp;N&nbsp;D&nbsp;A&nbsp;T&nbsp;I&nbsp;O&nbsp;N &nbsp;&nbsp; F&nbsp;R&nbsp;O&nbsp;M &nbsp;&nbsp; U&nbsp;S</h2>
                    </Row>
                    <div className="d-flex flex-wrap mt-4">
                        <div className="row justify-content-center" id="recommended">
                            {
                                data.filter(val => (val.id > 27))
                                    .map(filteredVal => {
                                        return (
                                            <Card className="cardRecomm mx-2">
                                                <Link to={`/detail-book/${filteredVal.id}`}>
                                                    <Card.Img variant="top" src={`../img/book/${filteredVal.id_book}.jpg`} />
                                                    <Card.Body style={{ textAlign: "center" }}>
                                                        <Card.Title style={titleStyle}>{filteredVal.title}</Card.Title>
                                                        <small className="text-muted">{filteredVal.author}</small>
                                                    </Card.Body>
                                                </Link>
                                            </Card>
                                        )
                                    })
                            }

                            {/* <Card className="cardRecomm mx-2">
                                <Card.Img variant="top" src={book1} />
                                <Card.Body style={{ textAlign: "center" }}>
                                    <Card.Title style={titleStyle}>Jalan Panjang untuk Pulang</Card.Title>
                                    <small className="text-muted">Agustinus Wibowo</small>
                                </Card.Body>
                            </Card>
                            <Card className="cardRecomm mx-2">
                                <Card.Img variant="top" src={book2} />
                                <Card.Body style={{ textAlign: "center" }}>
                                    <Card.Title style={titleStyle}>This Is How They Tell Me the World Ends: The Cyberweapons Arms Race</Card.Title>
                                    <small className="text-muted">Nicole Perlroth</small>
                                </Card.Body>
                            </Card>
                            <Card className="cardRecomm mx-2">
                                <Card.Img variant="top" src={book3} />
                                <Card.Body style={{ textAlign: "center" }}>
                                    <Card.Title style={titleStyle}>Pulang Pergi</Card.Title>
                                    <small className="text-muted">Tere Liye</small>
                                </Card.Body>
                            </Card>
                            <Card className="cardRecomm mx-2">
                                <Card.Img variant="top" src={book4} />
                                <Card.Body style={{ textAlign: "center" }}>
                                    <Card.Title style={titleStyle}>The Subtle Art of Not Giving a F*ck: A Counterintuitive Approach to Living a Good Life</Card.Title>
                                    <small className="text-muted">Mark Manson</small>
                                </Card.Body>
                            </Card>
                            <Card className="cardRecomm mx-2">
                                <Card.Img variant="top" src={book5} />
                                <Card.Body style={{ textAlign: "center" }}>
                                    <Card.Title style={titleStyle}>Pergi</Card.Title>
                                    <small className="text-muted">Tere Liye</small>
                                </Card.Body>
                            </Card>
                            <Card className="cardRecomm mx-2">
                                <Card.Img variant="top" src={book7} />
                                <Card.Body style={{ textAlign: "center" }}>
                                    <Card.Title style={titleStyle}>Detektif Conan 96</Card.Title>
                                    <small className="text-muted">Aoyama Gosho</small>
                                </Card.Body>
                            </Card> */}

                        </div>
                    </div>
                </Container>
            </>
        )
    }
}
