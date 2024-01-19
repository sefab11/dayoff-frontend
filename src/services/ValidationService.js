//REGISTER SCREEN METHODS

export const _isNameValid = (name) => {
    return name != '';
}

export const _isEmailValid = (email) => {
    return email != '';
}

const _hasNumber = (myString) => /\d/.test(myString);

export const _isPasswordValid = (password) => {
    if (password.length < 8) return false;
    else if (!_hasNumber(password)) return false;

    return true;
}

//FINISH PROFILE SCREEN METHODS

export const _isCountryOfOriginValid = (country) => {
    return country != '';
}

export const _isProfessionValid = (job) => {
    return job != '';
}

export const _handlePhoto = (photo) => {
    if (photo) console.log("photo has been added");
    else console.log("no photo added");
}

export const _handleLinkedin = (completed) => {
    if (completed) console.log("linkedin has been added");
    else console.log("linkedin failed to add");
}

//VERIFICATION SCREEN METHODS

export const _getUserEmail = () => {
    return 'name@workmail.com';
}

export const _isCodeCorrect = (code) => {
    return code == '00000';
}

export const _hasLinkedin = () => {
    //return true/false depending on if the user has already linked their url
    return false;
}

export const _hasPhoto = () => {
    return false;
}

//CREATE TRIP SCREEN METHODS

export const _isDateValid = (dateArr) => {
    try{
        if (dateArr.length == 1) console.log("valid date added");
        else console.log("invalid date added, should not occur - error with SelectDates");
    } catch (e){
        console.log("invalid param passed");
    }
}

export const _isCountryValid = (countryArr) => {
    try{
        if (countryArr.length == 1) console.log("valid country added");
        else console.log("invalid country.");
    } catch (e){
        console.log("invalid param passed");
    }
}

export const _isNumPeopleValid = (numPeople) => {
    if (numPeople > 1) console.log("valid number of people added.");
    else console.log("invalid number of people");
}

export const _isDescriptionValid = (desc) => {
    //check for bad words in description?
    if (desc.includes('fuck')) console.log("bad word detected, prevent trip creation");
    else console.log("valid description");
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
    handlePhoto: _handlePhoto,
    handleLinkedin: _handleLinkedin,
    getUserEmail: _getUserEmail,
    hasPhoto: _hasPhoto,
    hasLinkedin: _hasLinkedin,
};

const CreateTripValidationService = {
    isDateValid: _isDateValid,
    isCountryValid: _isCountryValid,
    isNumPeopleValid: _isNumPeopleValid,
    isDescriptionValid: _isDescriptionValid,
};

const FullValidationService = {
    Register: RegisterValidationService,
    FinishProfile: FinishProfileValidationService,
    Verification: VerificationValidationService,
    CreateTrip: CreateTripValidationService,
};


export default FullValidationService;
export {
    RegisterValidationService,
    FinishProfileValidationService,
    VerificationValidationService,
    CreateTripValidationService,
};