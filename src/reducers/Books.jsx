import { GET_BOOKS_LIST } from '../actions/BooksAction';

let initialState = {
    getBooksList: false,
    errorBooks: false,
};

const books = (state = initialState, action) => {
    switch (action.type) {
        case GET_BOOKS_LIST:
            return {
                ...state,
                getBooksList: action.payload.data,
                errorBooks: action.payload.errorMessage
            }
        default:
            return state;
    }

}

export default books;
