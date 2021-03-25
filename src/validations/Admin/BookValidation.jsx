const BookValidation = (values) => {
    const errors = {};

    if (!values.id_book || values.id_book === "") {
        errors.id_book = "ID Book cannot be empty!";
    }

    if (!values.cover || values.cover === "") {
        errors.cover = "Cover cannot be empty!";
    }

    if (!values.category || values.category === "") {
        errors.category = "Category cannot be empty!";
    }

    if (!values.title || values.title === "") {
        errors.title = "Title cannot be empty!";
    }

    if (!values.author || values.author === "") {
        errors.author = "Author cannot be empty!";
    }
    if (!values.publisher || values.publisher === "") {
        errors.publisher = "Publisher cannot be empty!";
    }
    if (!values.year || values.year === "") {
        errors.year = "Year cannot be empty!";
    }

    if (!values.stock || values.stock === "") {
        errors.stock = "Stock number cannot be empty!";
    }

    return errors;

}

export default BookValidation
