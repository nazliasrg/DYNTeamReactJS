import axios from 'axios';

export const GET_ACTIVITY_LIST = "GET_ACTIVITY_LIST";

const getActivityList = () => {
    return dispatch => {
        axios.get('https://605c7cdc6d85de00170da562.mockapi.io/activity')
            .then(function (res) {
                console.log(res);
                dispatch({
                    type: GET_ACTIVITY_LIST,
                    payload: {
                        data: res.data,
                        errorMessage: false
                    }
                })
            })
            .catch(function (error) {
                console.log(error);
                dispatch({
                    type: GET_ACTIVITY_LIST,
                    payload: {
                        data: false,
                        errorMessage: error.message
                    }
                })
            })
    }
}

export default getActivityList;