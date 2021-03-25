// import React, {Component, Fragment, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './Home.css';
// import { Link, withRouter } from 'react-router-dom';
// import Carousel from 'react-bootstrap/Carousel';
// import logo from '../../assets/Logo.png';
// import Header from '../../component/Header/Header';

// const data = [
//     {
//      image: require('../../assets/Logo.png'), 
//      caption:"Caption",
//      description:"Description Here"
//     },
//     {
//       image:require('../../assets/Logo.png'), 
//       caption:"Caption",
//       description:"Description Here"
//      },
//      {
//       image:require('../../assets/Logo.png'),
//       caption:"Caption",
//       description:"Description Here"
//      } 
//   ]
  
//   function HomeCarousel() {
//     const [index, setIndex] = useState(0);
//     const handleSelect = (selectedIndex, e) => {
//       setIndex(selectedIndex);
//     };
  
//     return (
//         <Fragment>
            
//       <Carousel activeIndex={index} onSelect={handleSelect}>
//          {data.map((slide, i) => {
//           return (
//             <Carousel.Item>        
//           <img
//             className="d-block w-100"
//             src={slide.image}
//             alt="slider image"
//           />
//           <Carousel.Caption>
//             <h3>{slide.caption}</h3>
//             <p>{slide.description}</p>
//           </Carousel.Caption>
//         </Carousel.Item>
//           )
//         })}
        
//       </Carousel>

//       </Fragment>
//     );
//   }


// export default HomeCarousel;