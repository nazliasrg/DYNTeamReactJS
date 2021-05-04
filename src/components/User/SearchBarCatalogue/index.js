import React from 'react';

const SearchBoxCatalogue = (props) =>{

    return(
        <div>
            <input onChange={props.handleInput} type="search" name="cari" id="cari" placeholder="Book title..." style={{width:"200px", height:"30px"}}></input>
        </div>
    );
}

export default SearchBoxCatalogue;