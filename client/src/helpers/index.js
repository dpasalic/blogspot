
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
        errors.email = "Email is required"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        errors.email = "Invalid email address";
    }

    // Password validation
    if (!password) {
        errors.password = "Password is required";
    } else if (password.length < 5) {
        errors.password = "Minimum 5 characters long";
    }

    return errors;
}