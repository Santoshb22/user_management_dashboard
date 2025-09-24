export const validateForm = (data) => {
    const error = {
        message: ""
    }

    if(!data.name) {
        error.message = "Name is required"
        return;
    } 

    const usernameRegex = /^[0-9A-Za-z]{6,16}$/;
    if (!data.username) {
        error.message = "Username is required";
        return error;
    } else if (!usernameRegex.test(data.username)) {
        error.message = "Username must be 6–16 characters (letters and numbers only)";
        return error;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email) {
        error.message = "Email is required";
        return error;
    } else if (!emailRegex.test(data.email)) {
        error.message = "Invalid email format";
        return error;
    }

    return null;
}
