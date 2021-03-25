const AdminValidation = (values) => {
    const errors = {};

    if (!values.no || values.no === "") {
        errors.no = "No cannot be empty!";
    }

    if (!values.id_role || values.id_role === "") {
        errors.id_role = "ID Role cannot be empty!";
    }

    if (!values.username || values.username === "") {
        errors.username = "Username cannot be empty!";
    }

    if (!values.level || values.level === "") {
        errors.level = "Level cannot be empty!";
    }

    if (!values.status || values.status === "") {
        errors.status = "Status number cannot be empty!";
    }

    return errors;

}

export default AdminValidation
