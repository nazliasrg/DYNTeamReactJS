import axios from 'axios';

export const GET_BOOKS_LIST = "GET_BOOKS_LIST";

const getBooksList = () => {
    return dispatch => {
        axios.get('json/book.json')
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
}

export default getBooksList;