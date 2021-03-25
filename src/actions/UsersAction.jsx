import axios from 'axios';

export const GET_USERS_LIST = "GET_USERS_LIST";
export const GET_USER_DETAIL = "GET_USER_DETAIL";
export const POST_USER_CREATE = "POST_USER_CREATE";

export const getUsersList = () => {
    return dispatch => {
        axios.get('https://605c7cdc6d85de00170da562.mockapi.io/user')
            .then(function (res) {
                console.log(res);
                dispatch({
                    type: GET_USERS_LIST,
                    payload: {
                        data: res.data,
                        errorMessage: false
                    }
                })
            })
            .catch(function (error) {
                console.log(error);
                dispatch({
                    type: GET_USERS_LIST,
                    payload: {
                        data: false,
                        errorMessage: error.message
                    }
                })
            })
    }
};

export const getUsersDetail = (id) => {
    return dispatch => {
        axios.get('https://605c7cdc6d85de00170da562.mockapi.io/user/' + id)
            .then(function (res) {
                console.log(res);
                dispatch({
                    type: GET_USER_DETAIL,
                    payload: {
                        data: res.data,
                        errorMessage: false
                    }
                })
            })
            .catch(function (error) {
                console.log(error);
                dispatch({
                    type: GET_USER_DETAIL,
                    payload: {
                        data: false,
                        errorMessage: error.message
                    }
                })
            })
    }
};

export const postUserCreate = (data) => {
    return dispatch => {
        axios.post('https://605c7cdc6d85de00170da562.mockapi.io/user', data)
            .then(function (res) {
                console.log(res);
                dispatch({
                    type: POST_USER_CREATE,
                    payload: {
                        data: res.data,
                        errorMessage: false
                    }
                })
            })
            .catch(function (error) {
                console.log(error);
                dispatch({
                    type: POST_USER_CREATE,
                    payload: {
                        data: false,
                        errorMessage: error.message
                    }
                })
            })
    }
};