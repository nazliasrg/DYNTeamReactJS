import React, {Fragment, Component} from 'react';
import OwlCard from '../../../components/User/OwlCarousel';
import axios from 'axios';

class CataloguePage extends Component{
    constructor(){
        super();
        this.state ={
            data:[],
        }
    }

    componentDidMount(){
        this.getUser();
    }

    getUser = () =>{
        axios.get('Json/Buku.json')
        .then(res =>{
            this.setState({
                data: res.data
            })
            // console.log(this.state.data);
        })
    }
    render(){
        const {data}= this.state;
        // console.log(data);
        
        return(
            <Fragment>
            <div className="d-flex flex-wrap flex-row">
                <OwlCard
                    data ={data}
                />
            </div>
            </Fragment>
        );
    }
}

export default CataloguePage;