import countriesData from "./data.json" assert { type: "json" };
document.addEventListener("alpine:init", () => {
  /* ---------------------- Alpine JS ---------------------- */
  Alpine.data("rest_countries", () => {
    return {
      /*------- STRINGS -------*/
      reqCountry: "",
      region: "",
      /*------- OBJECTS, ARRAYS  -------*/
      bordersList: [],
      countriesName: [],
      countryDetails: [],

      countries: countriesData,
      /*------- BOOLEANS  -------*/
      darkMode: true,
      error: false,
      /*------- METHODS  -------*/
      init() {
        countriesData.forEach((country) => {
          this.countriesName.push(country.name.toLowerCase());
        });
      },
      toggleDarkMode() {
        this.darkMode = !this.darkMode;
      },
      searchForCountry() {
        this.reqCountry = this.reqCountry.toLowerCase();
        //loop the countries array
        this.countries.forEach((country) => {
          //if the current country is the country that is being searched for
          //update the countries array, with the matching country's data
          if (country.name.toLowerCase() === this.reqCountry) {
            this.countries = [country];
          } else if (this.reqCountry === "") {
            //return the original data when there's no country in the input
            this.countries = countriesData;
          } else if (
            !this.countriesName.includes(this.reqCountry) &&
            this.reqCountry !== ""
          ) {
            //display error message when string is not a country name.
            this.error = true;
            this.reqCountry = "";
            setTimeout(() => {
              this.error = false;
            }, 2500);
          }
        });
      },
      filterByRegion() {
        this.countries = [];
        countriesData.forEach((country) => {
          if (country.region === this.region) {
            this.countries.push(country);
          }
        });
      },
      countryBordersByCode(countryName) {
        countriesData.forEach((country) => {
          //get country details for selected country.
          if (country.name === countryName) {
            this.countryDetails = [country];
            //if selected country has borders,
            if (country.borders) {
              //get last 3 borders for that country.
              this.bordersList = country.borders.slice(-3);
            }
            //change borders array, from country codes
            //to names, for matching country codes.
            this.bordersList = this.countryBordersByFullName(this.bordersList);
          }
        });
      },
      countryBordersByFullName(borderCodes) {
        countriesData.forEach((country) => {
          for (let i = 0; i < borderCodes.length; i++) {
            //get country name for country in the borderCodes arrary
            if (country.alpha3Code === borderCodes[i]) {
              borderCodes.push(country.name);
            }
          }
        });
        borderCodes = borderCodes.slice(3); //get rid of the country codes
        return borderCodes;
      },
    };
  });
});
