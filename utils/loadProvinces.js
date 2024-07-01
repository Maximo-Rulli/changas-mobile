const Provinces = require('../assets/jsons/Provinces.json')

function loadProvinces (inputCountry) {
    // Return the Provinces which match the country
    return (Provinces.find(country => country.country === inputCountry)).states
  }
  
export default loadProvinces
  