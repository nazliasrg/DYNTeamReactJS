const PublisherValidation = (values) => {
    const errors = {};

    if (!values.publisherName || values.publisherName === "") {
        errors.cover = "Publisher name cannot be empty!";
    }

    return errors;

}

export default PublisherValidation
