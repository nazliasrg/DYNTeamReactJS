import axios from 'axios';

export const GET_BOOKS_LIST = "GET_BOOKS_LIST";
export const GET_BOOK_DETAIL = "GET_BOOK_DETAIL";
export const POST_BOOK_CREATE = "POST_BOOK_CREATE";

export const getBooksList = () => {
    return dispatch => {
        axios.get('https://605c7cdc6d85de00170da562.mockapi.io/book')
            .then(function (res) {
                console.log(res);
                dispatch({
                    type: GET_BOOKS_LIST,
                    payload: {
                        data: res.data,
                        errorMessage: false
                    }
                })
            })
            .catch(function (error) {
                console.log(error);
                dispatch({
                    type: GET_BOOKS_LIST,
                    payload: {
                        data: false,
                        errorMessage: error.message
                    }
                })
            })
    }
};

export const getBookDetail = (id) => {
    return dispatch => {
        axios.get('https://605c7cdc6d85de00170da562.mockapi.io/book/' + id)
            .then(function (res) {
                console.log(res);
                dispatch({
                    type: GET_BOOK_DETAIL,
                    payload: {
                        data: res.data,
                        errorMessage: false
                    }
                })
            })
            .catch(function (error) {
                console.log(error);
                dispatch({
                    type: GET_BOOK_DETAIL,
                    payload: {
                        data: false,
                        errorMessage: error.message
                    }
                })
            })
    }
};

export const postBookCreate = (data) => {
    return dispatch => {
        axios.post('https://605c7cdc6d85de00170da562.mockapi.io/book', data)
            .then(function (res) {
                console.log(res);
                dispatch({
                    type: POST_BOOK_CREATE,
                    payload: {
                        data: res.data,
                        errorMessage: false
                    }
                })
            })
            .catch(function (error) {
                console.log(error);
                dispatch({
                    type: POST_BOOK_CREATE,
                    payload: {
                        data: false,
                        errorMessage: error.message
                    }
                })
            })
    }
};