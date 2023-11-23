fs = require('fs')
countries = require('../../assets/CountryCodes.json');

flags_source = 'export const flags = {\n'

for (key in countries.slice(0, -1)) {
    country = countries[key];
    flags_source += `\t'${country.code}': require('../../assets/flags/${country.code.toLowerCase()}'),\n`;
}

country = countries[countries.length - 1];
flags_source += `\t'${country.code}': require('../../assets/flags/${country.code.toLowerCase()}')\n}`;

fs.writeFileSync('flags.js', flags_source);