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

export const _isCountryValid = (country) => {
    return country != '';
}

export const _isProfessionValid = (job) => {
    return job != '';
}

//VERIFICATION SCREEN METHODS

//CREATE TRIP SCREEN METHODS




const RegisterValidationService = {
    isNameValid: _isNameValid,
    isEmailValid: _isEmailValid,
    isPasswordValid: _isPasswordValid,
}

const FinishProfileValidationService = {
    isCountryValid: _isCountryValid,
    isProfessionValid: _isProfessionValid,
}

const VerificationValidationService = {
}

const CreateTripValidationService = {
}

const FullValidationService = {
    RegisterValidationService,
    FinishProfileValidationService,
    VerificationValidationService,
    CreateTripValidationService,
}

export default FullValidationService;
export {
    RegisterValidationService,
    FinishProfileValidationService,
    VerificationValidationService,
    CreateTripValidationService,
}