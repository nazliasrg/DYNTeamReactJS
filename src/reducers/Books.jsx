import { GET_BOOKS_LIST, GET_BOOK_DETAIL, POST_BOOK_CREATE } from '../actions/BooksAction';

let initialState = {
    getBooksList: false,
    errorBooks: false,
    getBookDetail: false,
    errorBookDetail: false,
    getResponDataBook: false,
    errorResponDataBook: false
};

const books = (state = initialState, action) => {
    switch (action.type) {
        case GET_BOOKS_LIST:
            return {
                ...state,
                getBooksList: action.payload.data,
                errorBooks: action.payload.errorMessage
            }
        case GET_BOOK_DETAIL:
            return {
                ...state,
                getBookDetail: action.payload.data,
                errorBookDetail: action.payload.errorMessage
            }

        case POST_BOOK_CREATE:
            return {
                ...state,
                getResponDataBook: action.payload.data,
                errorResponDataBook: action.payload.errorMessage
            }
        default:
            return state;
    }

}

export default books;
