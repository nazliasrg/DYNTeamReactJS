import axios from 'axios';

export const GET_ADMIN_LIST = "GET_ADMIN_LIST";
export const GET_ADMIN_DETAIL = "GET_ADMIN_DETAIL";
export const POST_ADMIN_CREATE = "POST_ADMIN_CREATE";

export const getAdminList = () => {
    return dispatch => {
        axios.get('https://605c7cdc6d85de00170da562.mockapi.io/admin')
            .then(function (res) {
                console.log(res);
                dispatch({
                    type: GET_ADMIN_LIST,
                    payload: {
                        data: res.data,
                        errorMessage: false
                    }
                })
            })
            .catch(function (error) {
                console.log(error);
                dispatch({
                    type: GET_ADMIN_LIST,
                    payload: {
                        data: false,
                        errorMessage: error.message
                    }
                })
            })
    }
};

export const getAdminDetail = (id) => {
    return dispatch => {
        axios.get('https://605c7cdc6d85de00170da562.mockapi.io/admin/' + id)
            .then(function (res) {
                console.log(res);
                dispatch({
                    type: GET_ADMIN_DETAIL,
                    payload: {
                        data: res.data,
                        errorMessage: false
                    }
                })
            })
            .catch(function (error) {
                console.log(error);
                dispatch({
                    type: GET_ADMIN_DETAIL,
                    payload: {
                        data: false,
                        errorMessage: error.message
                    }
                })
            })
    }
};

export const postAdminCreate = (data) => {
    return dispatch => {
        axios.post('https://605c7cdc6d85de00170da562.mockapi.io/admin', data)
            .then(function (res) {
                console.log(res);
                dispatch({
                    type: POST_ADMIN_CREATE,
                    payload: {
                        data: res.data,
                        errorMessage: false
                    }
                })
            })
            .catch(function (error) {
                console.log(error);
                dispatch({
                    type: POST_ADMIN_CREATE,
                    payload: {
                        data: false,
                        errorMessage: error.message
                    }
                })
            })
    }
};

export const deleteDataAdmin = () => {
    return (dispatch) => {
        dispatch({
            type: GET_ADMIN_DETAIL,
            payload: {
                data: false,
                errorMessage: false
            }
        })

        dispatch({
            type: POST_ADMIN_CREATE,
            payload: {
                data: false,
                errorMessage: false
            }
        })
    }
};