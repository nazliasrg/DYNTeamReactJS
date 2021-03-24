const UserValidation = (values) => {
    const errors = {};

    if (!values.no || values.no === "") {
        errors.no = "No cannot be empty!";
    }

    if (!values.id_user || values.id_user === "") {
        errors.id_user = "ID User cannot be empty!";
    }

    if (!values.name || values.name === "") {
        errors.name = "Name cannot be empty!";
    }

    if (!values.email || values.email === "") {
        errors.email = "Email cannot be empty!";
    }

    if (!values.phone_number || values.phone_number === "") {
        errors.phone_number = "Phone number cannot be empty!";
    }

    if (!values.member || values.member === "") {
        errors.member = "Member cannot be empty!";
    }

    if (!values.status || values.status === "") {
        errors.status = "Member cannot be empty!";
    }

    return errors;

}

export default UserValidation
