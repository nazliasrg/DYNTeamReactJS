const CategoryValidation = (values) => {
    const errors = {};

    if (!values.categoryName || values.categoryName === "") {
        errors.cover = "Category name cannot be empty!";
    }

    return errors;

}

export default CategoryValidation
