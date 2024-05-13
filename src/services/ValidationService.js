// REGISTER SCREEN METHODS
const emailExistsURL = process.env.EXPO_PUBLIC_API_URL + "/email-exists";

//checks if name isnt empty
const _isNameValid = (name) => {
  return name != "";
};

const _hasNumber = (myString) => /\d/.test(myString);

//check if password meets requirements
const _isPasswordValid = (password) => {
  if (password.length < 8) return false;
  else if (!_hasNumber(password)) return false;

  return true;
};

// FINISH PROFILE SCREEN METHODS

//checks if country is in list of all countries
const _isCountryOfOriginValid = (country) => {
  var codes = require("i18n-iso-countries");
  codes.registerLocale(require("i18n-iso-countries/langs/en.json"));
  const englishCodes = codes.getNames("en", { select: "official" });

  var englishNames = Object.keys(englishCodes).map(function (key) {
    return englishCodes[key];
  });

  return englishNames.includes(country);
};

//check if job is valid
const _isProfessionValid = (job) => {
  return job != "";
};

// CREATE TRIP SCREEN METHODS

//check if there is a date
const _isDateValid = (date) => {
  return date != "";
};

//check if there is a country
const _isCountryValid = (country) => {
  return country != "";
};

//check if number of people is a string, more than min, less than max
const _isNumPeopleValid = (num) => {
  if (num == "") return false;
  else if (num <= 1) return false;
  else if (num > 12) return false;

  return true;
};

export default FullValidationService = {
  isNameValid: _isNameValid,
  isPasswordValid: _isPasswordValid,
  isCountryValid: _isCountryOfOriginValid,
  isProfessionValid: _isProfessionValid,
  isDateValid: _isDateValid,
  isCountryValid: _isCountryValid,
  isNumPeopleValid: _isNumPeopleValid,
};
