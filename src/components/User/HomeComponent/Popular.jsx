import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import { Row, Col } from 'reactstrap'
import OwlCarousel from 'react-owl-carousel'
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import axios from 'axios'
import HomeCard from './HomeCard';

export default class Popular extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        };
    }

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

    async componentDidMount() {
        await this.authHeader();
        await this.getBooks();
    }

    getBooks = () => {
        const user = this.authHeader();

        axios.get('http://localhost:7070/api/dynteam/auth/user/getBookPopuler', {
            headers: user
        })
            .then(res => {
                this.setState({
                    data: res.data
                })
                console.log(this.state.data);
            })
    }

    render() {
        return (

            <section class="pt-5 pb-5 mt-4">
                <Container>
                    <Row className="justify-content-center">
                        <h3 class="mb-3 pageTitle">M&nbsp;&nbsp;O&nbsp;S&nbsp;T &nbsp;&nbsp; P&nbsp;O&nbsp;P&nbsp;U&nbsp;L&nbsp;A&nbsp;R &nbsp;&nbsp; B&nbsp;O&nbsp;O&nbsp;K&nbsp;S </h3>
                    </Row>
                    <Row className="mt-4 justify-content-center">
                        <Col md={12}>

                            <OwlCarousel items={6} className='owl-theme' loop margin={5} nav>
                                <HomeCard />
                            </OwlCarousel>

                        </Col>
                    </Row>
                </Container>
            </section>

        )
    }
}
