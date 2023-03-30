export const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
};

export const validatePhoneNum = (inputtxt) => {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (inputtxt.match(phoneno)) {
        return true;
    } else {
        return false;
    }
};

export const validatePassword = (inputtxt) => {
    var password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (inputtxt.match(password)) {
        return true;
    } else {
        return false;
    }
};
