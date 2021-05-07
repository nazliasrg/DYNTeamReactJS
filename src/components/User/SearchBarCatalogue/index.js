import React from 'react';

const SearchBoxCatalogue = (props) =>{

    return(
        <div>
            <input onChange={props.handleInput} type="search" class="form-control" id="cari" placeholder="Search by book title..." style={{width:"500px", height:"30px"}}></input>
        </div>
    );
}

export default SearchBoxCatalogue;