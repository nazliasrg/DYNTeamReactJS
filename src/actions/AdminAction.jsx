import axios from 'axios';

export const GET_ADMIN_LIST = "GET_ADMIN_LIST";
export const GET_ADMIN_DETAIL = "GET_ADMIN_DETAIL";
export const POST_ADMIN_CREATE = "POST_ADMIN_CREATE";

export const getAdminList = () => {
    return dispatch => {
        axios.get('json/admin.json')
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

export const getAdminDetail = (no) => {
    return dispatch => {
        axios.get('json/admin.json/' + no)
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
        axios.post('json/admin.json', data)
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