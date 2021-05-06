import React, { Component } from 'react'
import { Card, Container, Row } from 'react-bootstrap'
import './Recommended.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class Recommended extends Component {
    constructor() {
        super();
        this.state = {
            recommended: []
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
        await this.getBooks()
    }

    getBooks = () => {
        const user = this.authHeader();

        axios.get('http://localhost:7070/api/dynteam/auth/user/getBookNew', {
            headers: user
        })
            .then(res => {
                console.log(res.data.data)
                this.setState({
                    recommended: res.data.data
                })
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    render() {
        const { recommended } = this.state;

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
                                recommended.map(filteredVal => {
                                    return (
                                        <Card className="cardRecomm mx-2">
                                            <Link to={`/detail-book/${filteredVal.bookId}`}>
                                                <Card.Img variant="top" src={`http://localhost:7070/api/dynteam/book/cover/download/${filteredVal.cover}`} />
                                                <Card.Body style={{ textAlign: "center" }}>
                                                    <Card.Title className="cardTitle" style={titleStyle}>{filteredVal.title}</Card.Title>
                                                    <small className="text-muted">{filteredVal.authorEntity.authorName}</small>
                                                </Card.Body>
                                            </Link>
                                        </Card>
                                    )
                                })
                            }

                        </div>
                    </div>
                </Container>
            </>
        )
    }
}
