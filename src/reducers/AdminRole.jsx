import { GET_ADMIN_LIST, GET_ADMIN_DETAIL, POST_ADMIN_CREATE } from '../actions/AdminAction';

let initialState = {
    getAdminList: false,
    errorAdmin: false,
    getAdminDetail: false,
    errorAdminDetail: false,
    getResponDataAdmin: false,
    errorResponDataAdmin: false
};

const adminRole = (state = initialState, action) => {
    switch (action.type) {
        case GET_ADMIN_LIST:
            return {
                ...state,
                getAdminList: action.payload.data,
                errorAdmin: action.payload.errorMessage
            }

        case GET_ADMIN_DETAIL:
            return {
                ...state,
                getAdminDetail: action.payload.data,
                errorAdminDetail: action.payload.errorMessage
            }

        case POST_ADMIN_CREATE:
            return {
                ...state,
                getResponDataAdmin: action.payload.data,
                errorResponDataAdmin: action.payload.errorMessage
            }

        default:
            return state;
    }
}

export default adminRole
