// Function for getting random number - used on creating new records in json server
export const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

// Function for parsing JWT
export const parseJwt = token => {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

// Code for formatting timestamps - used for showing comments time passed from creating
const formatter = new Intl.RelativeTimeFormat(undefined, {
    numeric: 'auto',
    style: "long"
});
const DIVISIONS = [
    { amount: 60, name: 'seconds' },
    { amount: 60, name: 'minutes' },
    { amount: 24, name: 'hours' },
    { amount: 7, name: 'days' },
    { amount: 4.34524, name: 'weeks' },
    { amount: 12, name: 'months' },
    { amount: Number.POSITIVE_INFINITY, name: 'years' }
];
export const formatTimeAgo = date => {
    let duration = (date - new Date()) / 1000;

    for (let i = 0; i < DIVISIONS.length; i++) {
        const division = DIVISIONS[i];
        if (Math.abs(duration) < division.amount) {
            return formatter.format(Math.round(duration), division.name);
        }

        duration /= division.amount;
    }
};

// Function for login form validation
export const validateLoginForm = (email, password) => {
    const errors = {};

    // Email validation
    if (!email) {
        errors.email = "Email address required";
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

// Function for validating user's full name on signup
export const validateSignupFirstSection = (firstName, lastName) => {
    const errors = {};

    // First name validation
    if (!firstName) {
        errors.firstName = "First name required";
    } else if (/\d/.test(firstName)) {
        errors.firstName = "Numbers not allowed";
    } else if (/[,<.>/?;:'"[{}\]\\\-_=+*!@#$%\^&()`~]/.test(firstName)) {
        errors.firstName = "Special characters not allowed";
    } else if (firstName.length < 2) {
        errors.firstName = "Minimum two characters";
    }

    if (!lastName) {
        errors.lastName = "Last name required";
    } else if (/\d/.test(lastName)) {
        errors.lastName = "Numbers not allowed";
    } else if (/[,<.>/?;:'"[{}\]\\\-_=+*!@#$%\^&()]/.test(lastName)) {
        errors.lastName = "Special characters not allowed";
    } else if (lastName.length < 2) {
        errors.lastName = "Minimum two characters";
    }

    return errors;
};

// Function for validating email and password on signup
export const validateSignupSecondSection = (email, password) => {
    const errors = {};

    // Email validation
    if (!email) {
        errors.email = "Email address required";
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

// New blog validation function
export const validateNewBlog = (title, body) => {
    const errors = {};

    // Title validation
    if (!title) {
        errors.title = "Title required";
    }

    // Body validation
    if (!body) {
        errors.body = "Body required";
    }

    return errors;
};

// Validation of user edit form
export const validateEditUser = (firstName, lastName, email, password) => {
    const errors = {};

    if (!firstName) {
        errors.firstName = "First name required";
    } else if (/\d/.test(firstName)) {
        errors.firstName = "Numbers not allowed";
    } else if (/[,<.>/?;:'"[{}\]\\\-_=+*!@#$%\^&()`~]/.test(firstName)) {
        errors.firstName = "Special characters not allowed";
    } else if (firstName.length < 2) {
        errors.firstName = "Minimum two characters";
    }

    if (!lastName) {
        errors.lastName = "Last name required";
    } else if (/\d/.test(lastName)) {
        errors.lastName = "Numbers not allowed";
    } else if (/[,<.>/?;:'"[{}\]\\\-_=+*!@#$%\^&()]/.test(lastName)) {
        errors.lastName = "Special characters not allowed";
    } else if (lastName.length < 2) {
        errors.lastName = "Minimum two characters";
    }

    if (!email) {
        errors.email = "Email address required"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        errors.email = "Invalid email address";
    }

    if (password.length > 0 && password.length < 5) {
        errors.password = "Minimum five characters";
    }

    return errors;
};