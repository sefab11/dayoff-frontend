//REGISTER SCREEN METHODS
const emailExistsURL = process.env.EXPO_PUBLIC_API_URL + "/email-exists"

//checks if name isnt empty
export const _isNameValid = (name) => {
    return name != '';
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

//VERIFICATION SCREEN METHODS
const codeURL = process.env.EXPO_PUBLIC_API_URL + "/validate-otp";

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
    isPasswordValid: _isPasswordValid,
};

const FinishProfileValidationService = {
    isCountryValid: _isCountryOfOriginValid,
    isProfessionValid: _isProfessionValid,
};

const VerificationValidationService = {
    isCodeCorrect: _isCodeCorrect,
};

const CreateTripValidationService = {
    isDateValid: _isDateValid,
    isCountryValid: _isCountryValid,
    isNumPeopleValid: _isNumPeopleValid,
};

const FullValidationService = {
    isNameValid: _isNameValid,
    isPasswordValid: _isPasswordValid,
    isCountryValid: _isCountryOfOriginValid,
    isProfessionValid: _isProfessionValid,
    isCodeCorrect: _isCodeCorrect,
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