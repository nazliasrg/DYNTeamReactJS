import { combineReducers } from 'redux'
import adminRole from './AdminRole'
import users from './Users'
import books from './Books'
import activity from './Activity'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers(
    {
        adminRole,
        users,
        books,
        activity,
        form: formReducer
    }
);

export default rootReducer;

