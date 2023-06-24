import countriesFlags from "./countriesFlags";

// Function to get the flag of a country based on its name or alias
export const getCountryFlag = (data) => {
  for (let country in countriesFlags) {
    // Check if the country name matches the data or if the country's alias matches the data
    if (country === data || countriesFlags[country].alias === data) {
      return countriesFlags[country]; // Return the flag object for the matched country
    }
  }

  return {}; // Return an empty object if no match is found
};
