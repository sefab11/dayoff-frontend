fs = require('fs')
countries = require('../../assets/CountryCodes.json');

flags_source = 'export const flags = {\n'

for (key in countries.slice(0, -1)) {
    country = countries[key];
    if (fs.existsSync(`../../assets/flags/${country.code.toLowerCase()}.png`)) {
        flags_source += `\t'${country.code}': require('../../assets/flags/${country.code.toLowerCase()}.png'),\n`;
    }
}

country = countries[countries.length - 1];
if (fs.existsSync(`../../assets/flags/${country.code.toLowerCase()}.png`)) {
    flags_source += `\t'${country.code}': require('../../assets/flags/${country.code.toLowerCase()}.png')\n}`;
}

fs.writeFileSync('flags.js', flags_source);