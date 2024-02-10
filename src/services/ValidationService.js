//REGISTER SCREEN METHODS
const emailExistsURL = process.env.EXPO_PUBLIC_API_URL + "/email-exists"

//checks if name isnt empty
export const _isNameValid = (name) => {
    return name != '';
}

//TODO:check if email isn't already in use
export const _isEmailValid = (email) => {
    return fetch(emailExistsURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            'email': email
        })
    })
    .then((response) => response.json())
    .then((data) => {
        try {
            let token = JSON.parse(data.body).session_token;
            return {statusCode: data.statusCode, sessionToken: token};
        }
        catch {}
        return {statusCode: data.statusCode};
    })
    .catch((error) => {
        return {statusCode: 400};
    })
    return email != '';
}

const _hasNumber = (myString) => /\d/.test(myString);

//check if password meets requirements
export const _isPasswordValid = (password) => {
    if (password.length < 8) return false;
    else if (!_hasNumber(password)) return false;

    return true;
}

//FINISH PROFILE SCREEN METHODS

//checks if country is in list of all countries
export const _isCountryOfOriginValid = (country) => {
    var codes = require("i18n-iso-countries");
    codes.registerLocale(require("i18n-iso-countries/langs/en.json"));
    const englishCodes = codes.getNames('en', {select: 'official'});

    var englishNames = Object.keys(englishCodes).map(function(key){
        return englishCodes[key];
    })

    return englishNames.includes(country);
}

//check if job is valid
export const _isProfessionValid = (job) => {
    return job != '';
}

//TODO: update users photo in database
export const _handlePhoto = (photo) => {
    if (photo) console.log("photo has been added");
    else console.log("no photo added");
}

//TODO: update users linkedin url in database
export const _handleLinkedin = (completed) => {
    if (completed) console.log("linkedin has been added");
    else console.log("linkedin failed to add");
}

//VERIFICATION SCREEN METHODS
const codeURL = process.env.EXPO_PUBLIC_API_URL + "/validate-otp";
const verifyURL = process.env.EXPO_PUBLIC_API_URL + "/verify-user";

export const _isCodeCorrect = (code) => {
    return fetch(codeURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            'email': email,
            'code': JSON.stringify(code),
        })
    })
    .then((response) => response.json())
    .then((data) => {
        try {
            let token = JSON.parse(data.body).session_token;
            return {statusCode: data.statusCode, sessionToken: token};
        }
        catch {}
        return {statusCode: data.statusCode};
    })
    .catch((error) => {
        return {statusCode: 400};
    })
}

export const _verifyUser = (email) => {
    return fetch(verifyURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            'email': email
        })
    })
    .then((response) => response.json())
    .then((data) => {
        try {
            let token = JSON.parse(data.body).session_token;
            return {statusCode: data.statusCode, sessionToken: token};
        }
        catch {}
        return {statusCode: data.statusCode};
    })
    .catch((error) => {
        return {statusCode: 400};
    })
}

//TODO: get users linkedin url from database
export const _getLinkedin = (email) => {
    //using random gen to show different returns
    choice = Math.floor(Math.random() * 2);
    if (choice == 0) return 'linkedin.com/name-2253'; //return the link if exists
    else return null; //return null if not
}

//TODO: get users photo from database
export const _getPhoto = (email) => {
    choice = Math.floor(Math.random() * 2);
    if (choice == 0) return require("../../assets/images/profilePics/1.jpg"); //return pic if exists
    else return null; //return null if not
}

//CREATE TRIP SCREEN METHODS

//check if there is a date
export const _isDateValid = (date) => {
    return date != '';
}

//check if there is a country
export const _isCountryValid = (country) => {
    return country != '';
}

//check if number of people is a string, more than min, less than max
export const _isNumPeopleValid = (num) => {
    if (num == '') return false;
    else if (num <= 1) return false;
    else if (num > 12) return false;

    return true;
}

//VALIDATION SERVICES

const RegisterValidationService = {
    isNameValid: _isNameValid,
    isEmailValid: _isEmailValid,
    isPasswordValid: _isPasswordValid,
};

const FinishProfileValidationService = {
    isCountryValid: _isCountryOfOriginValid,
    isProfessionValid: _isProfessionValid,
    handlePhoto: _handlePhoto,
    handleLinkedin: _handleLinkedin,
};

const VerificationValidationService = {
    isCodeCorrect: _isCodeCorrect,
    verifyUser: _verifyUser,
    handlePhoto: _handlePhoto,
    handleLinkedin: _handleLinkedin,
    getPhoto: _getPhoto,
    getLinkedin: _getLinkedin,
};

const CreateTripValidationService = {
    isDateValid: _isDateValid,
    isCountryValid: _isCountryValid,
    isNumPeopleValid: _isNumPeopleValid,
};

const FullValidationService = {
    isNameValid: _isNameValid,
    isEmailValid: _isEmailValid,
    isPasswordValid: _isPasswordValid,
    isCountryValid: _isCountryOfOriginValid,
    isProfessionValid: _isProfessionValid,
    handlePhoto: _handlePhoto,
    handleLinkedin: _handleLinkedin,
    isCodeCorrect: _isCodeCorrect,
    verifyUser: _verifyUser,
    getPhoto: _getPhoto,
    getLinkedin: _getLinkedin,
    isDateValid: _isDateValid,
    isCountryValid: _isCountryValid,
    isNumPeopleValid: _isNumPeopleValid,
};


export default FullValidationService;
export {
    RegisterValidationService,
    FinishProfileValidationService,
    VerificationValidationService,
    CreateTripValidationService,
};