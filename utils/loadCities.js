// Map of Names to Country imports
const countryMap = {
  'Argentina': require('../assets/jsons/Argentina_localities.json')
}

function loadCities (inputCountry, fullProvinces, inputProvince) {
  const cities = countryMap[inputCountry]
  const provinceCode = (fullProvinces.find(province => province.name === inputProvince)).code
  const provinceCities = cities.filter((city) => city.code === provinceCode).map(city => city.name)

  // Return the cities that are inside the inputProvince
  return provinceCities
}
  
export default loadCities
  