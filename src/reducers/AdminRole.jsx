import { GET_ADMIN_LIST } from '../actions/AdminAction';

let initialState = {
    getAdminList: false,
    errorAdmin: false,
};

const adminRole = (state = initialState, action) => {
    switch (action.type) {
        case GET_ADMIN_LIST:
            return {
                ...state,
                getAdminList: action.payload.data,
                errorAdmin: action.payload.errorMessage
            }
        default:
            return state;
    }

}

export default adminRole
