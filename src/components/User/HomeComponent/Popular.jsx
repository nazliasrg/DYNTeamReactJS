import React, { Component } from 'react'
import { Container, Card } from 'react-bootstrap'
import { Row, Col } from 'reactstrap'
import OwlCarousel from 'react-owl-carousel'
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import book1 from '../../../assets/book/B001.jpg'
import book2 from '../../../assets/book/B002.jpg'
import book3 from '../../../assets/book/B003.jpg'
import book4 from '../../../assets/book/B004.jpg'
import book5 from '../../../assets/book/B005.jpg'
import book7 from '../../../assets/book/B007.jpg'

export default class Popular extends Component {
    render() {
        const titleStyle = {
            fontSize: "14px",
            fontWeight: "bold",
            textAlign: "center"
        }
        const cardStyle = {
            width: "95%"
        }
        return (

            <section class="pt-5 pb-5 mt-4">
                <Container>
                    <Row className="justify-content-center">
                        <h3 class="mb-3 pageTitle">M&nbsp;&nbsp;O&nbsp;S&nbsp;T &nbsp;&nbsp; P&nbsp;O&nbsp;P&nbsp;U&nbsp;L&nbsp;A&nbsp;R &nbsp;&nbsp; B&nbsp;O&nbsp;O&nbsp;K&nbsp;S </h3>
                    </Row>
                    <Row className="mt-4 justify-content-center">
                        <Col md={12}>
                            <OwlCarousel items={6} className='owl-theme' loop margin={5} nav>
                                <div class='item'>
                                    <Card style={cardStyle}>
                                        <Card.Img variant="top" src={book1} />
                                        <Card.Body style={{ textAlign: "center" }}>
                                            <Card.Title style={titleStyle}>Jalan Panjang untuk Pulang</Card.Title>
                                            <small className="text-muted">Agustinus Wibowo</small>
                                        </Card.Body>
                                    </Card>
                                </div>
                                <div class='item'>
                                    <Card style={cardStyle}>
                                        <Card.Img variant="top" src={book2} />
                                        <Card.Body style={{ textAlign: "center" }}>
                                            <Card.Title style={titleStyle}>This Is How They Tell Me the World Ends: The Cyberweapons Arms Race</Card.Title>
                                            <small className="text-muted">Nicole Perlroth</small>
                                        </Card.Body>
                                    </Card>
                                </div>
                                <div class='item'>
                                    <Card style={cardStyle}>
                                        <Card.Img variant="top" src={book3} />
                                        <Card.Body style={{ textAlign: "center" }}>
                                            <Card.Title style={titleStyle}>Pulang Pergi</Card.Title>
                                            <small className="text-muted">Tere Liye</small>
                                        </Card.Body>
                                    </Card>
                                </div>
                                <div class='item'>
                                    <Card style={cardStyle}>
                                        <Card.Img variant="top" src={book3} />
                                        <Card.Body style={{ textAlign: "center" }}>
                                            <Card.Title style={titleStyle}>Pulang Pergi</Card.Title>
                                            <small className="text-muted">Tere Liye</small>
                                        </Card.Body>
                                    </Card>
                                </div>
                                <div class='item'>
                                    <Card style={cardStyle}>
                                        <Card.Img variant="top" src={book3} />
                                        <Card.Body style={{ textAlign: "center" }}>
                                            <Card.Title style={titleStyle}>Pulang Pergi</Card.Title>
                                            <small className="text-muted">Tere Liye</small>
                                        </Card.Body>
                                    </Card>
                                </div>
                                <div class='item'>
                                    <Card style={cardStyle}>
                                        <Card.Img variant="top" src={book3} />
                                        <Card.Body style={{ textAlign: "center" }}>
                                            <Card.Title style={titleStyle}>Pulang Pergi</Card.Title>
                                            <small className="text-muted">Tere Liye</small>
                                        </Card.Body>
                                    </Card>
                                </div>
                                <div class='item'>
                                    <Card style={cardStyle}>
                                        <Card.Img variant="top" src={book1} />
                                        <Card.Body style={{ textAlign: "center" }}>
                                            <Card.Title style={titleStyle}>Jalan Panjang untuk Pulang</Card.Title>
                                            <small className="text-muted">Agustinus Wibowo</small>
                                        </Card.Body>
                                    </Card>
                                </div>
                                <div class='item'>
                                    <Card style={cardStyle}>
                                        <Card.Img variant="top" src={book2} />
                                        <Card.Body style={{ textAlign: "center" }}>
                                            <Card.Title style={titleStyle}>This Is How They Tell Me the World Ends: The Cyberweapons Arms Race</Card.Title>
                                            <small className="text-muted">Nicole Perlroth</small>
                                        </Card.Body>
                                    </Card>
                                </div>
                                <div class='item'>
                                    <Card style={cardStyle}>
                                        <Card.Img variant="top" src={book3} />
                                        <Card.Body style={{ textAlign: "center" }}>
                                            <Card.Title style={titleStyle}>Pulang Pergi</Card.Title>
                                            <small className="text-muted">Tere Liye</small>
                                        </Card.Body>
                                    </Card>
                                </div>
                                <div class='item'>
                                    <Card style={cardStyle}>
                                        <Card.Img variant="top" src={book3} />
                                        <Card.Body style={{ textAlign: "center" }}>
                                            <Card.Title style={titleStyle}>Pulang Pergi</Card.Title>
                                            <small className="text-muted">Tere Liye</small>
                                        </Card.Body>
                                    </Card>
                                </div>
                                <div class='item'>
                                    <Card style={cardStyle}>
                                        <Card.Img variant="top" src={book3} />
                                        <Card.Body style={{ textAlign: "center" }}>
                                            <Card.Title style={titleStyle}>Pulang Pergi</Card.Title>
                                            <small className="text-muted">Tere Liye</small>
                                        </Card.Body>
                                    </Card>
                                </div>
                                <div class='item'>
                                    <Card style={cardStyle}>
                                        <Card.Img variant="top" src={book3} />
                                        <Card.Body style={{ textAlign: "center" }}>
                                            <Card.Title style={titleStyle}>Pulang Pergi</Card.Title>
                                            <small className="text-muted">Tere Liye</small>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </OwlCarousel>
                        </Col>
                    </Row>
                </Container>
            </section>

        )
    }
}
