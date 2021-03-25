import React, { Component } from 'react'
import './SearchBar.css'

export default class SearchBar extends Component {
    render() {
        return (
            <div>
                <form className="d-flex searchBtn">
                    <input className="form-control me-2 input-keyword" type="search" placeholder="Title Book" aria-label="Search" />
                    <button className="btn btn-light search-button" type="submit">Search</button>
                </form>
            </div>
        )
    }
}
