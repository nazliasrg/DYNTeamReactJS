import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import axios from 'axios'


class HomeCard extends Component {

    constructor() {
        super();
        this.state = {
            popular: []
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

        axios.get('http://localhost:7070/api/dynteam/auth/user/getBookPopuler', {
            headers: user
        })
            .then(res => {
                console.log(res.data.data)
                this.setState({
                    popular: res.data.data
                })
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    render() {
        const { popular } = this.state;

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
                    popular.map((val) => {
                        return (
                            <div className='item'>
                                <Card style={cardStyle}>
                                    <Card.Img variant="top" src={`http://localhost:7070/api/dynteam/book/cover/download/${val.bookEntity.cover}`} />
                                    <Card.Body style={{ textAlign: "center" }}>
                                        <Card.Title className="cardTitle" style={titleStyle}>{val.bookEntity.title}</Card.Title>
                                        <small className="text-muted">{val.bookEntity.authorEntity.authorName}</small>
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