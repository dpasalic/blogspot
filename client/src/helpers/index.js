
// Function for getting random number
export const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

// Function for parsing JWT
export const parseJwt = (token) => {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

// Function for validating input fields
// related to user (first name, last name, email, password)
export const validateLoginForm = (email, password) => {
    const errors = {};
    
    // Email validation
    if (!email) {
        errors.email = "Email address required"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        errors.email = "Invalid email address";
    }

    // Password validation
    if (!password) {
        errors.password = "Password required";
    } else if (password.length < 5) {
        errors.password = "Minimum five characters";
    }

    return errors;
};

export const validateSignupFirstSection = (firstName, lastName) => {
    const errors = {};

    // First name validation
    if (!firstName) {
        errors.firstName = "First name required";
    } else if(/\d/.test(firstName)) {
        errors.firstName = "Numbers not allowed";
    } else if(/[,<.>/?;:'"[{}\]\\\-_=+*!@#$%\^&()]/.test(firstName)) {
        errors.firstName = "Special characters not allowed";
    } else if (firstName.length < 2) {
        errors.firstName = "Minimum two characters";
    }

    if (!lastName) {
        errors.lastName = "Last name required";
    } else if(/\d/.test(lastName)) {
        errors.lastName = "Numbers not allowed";
    } else if(/[,<.>/?;:'"[{}\]\\\-_=+*!@#$%\^&()]/.test(lastName)) {
        errors.lastName = "Special characters not allowed";
    } else if (lastName.length < 2) {
        errors.lastName = "Minimum two characters";
    }

    return errors;
};

export const validateSignupSecondSection = (email, password) => {
    const errors = {};
    
    // Email validation
    if (!email) {
        errors.email = "Email address required"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        errors.email = "Invalid email address";
    }

    // Password validation
    if (!password) {
        errors.password = "Password required";
    } else if (password.length < 5) {
        errors.password = "Minimum five characters";
    }

    return errors;
};