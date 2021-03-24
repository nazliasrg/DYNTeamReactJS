import axios from 'axios';

export const GET_ADMIN_LIST = "GET_ADMIN_LIST";

const getAdminList = () => {
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
}

export default getAdminList;