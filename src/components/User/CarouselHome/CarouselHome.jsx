import React, { Component } from 'react'

import { Carousel } from 'react-bootstrap'
import carousel1 from '../../../assets/carousel0.jpg'
import carousel2 from '../../../assets/carousel1.jpg'
import carousel3 from '../../../assets/carousel.jpg'

export default class CarouselHome extends Component {
    render() {
        return (
            <>
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={carousel1}
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={carousel2}
                            alt="Second slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={carousel3}
                            alt="Third slide"
                        />
                    </Carousel.Item>
                </Carousel>
            </>
        )
    }
}
