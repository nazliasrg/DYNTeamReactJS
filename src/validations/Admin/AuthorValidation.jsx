const AuthorValidation = (values) => {
    const errors = {};

    if (!values.authorName || values.authorName === "") {
        errors.cover = "Author name cannot be empty!";
    }

    return errors;

}

export default AuthorValidation
