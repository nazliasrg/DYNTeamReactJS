import { GET_ACTIVITY_LIST } from '../actions/ActivityAction';

let initialState = {
    getActivityList: false,
    errorActivity: false,
};

const activity = (state = initialState, action) => {
    switch (action.type) {
        case GET_ACTIVITY_LIST:
            return {
                ...state,
                getActivityList: action.payload.data,
                errorActivity: action.payload.errorMessage
            }
        default:
            return state;
    }

}

export default activity;
