"use strict";
import json from "./data.json" assert { type: "json" };
document.addEventListener("alpine:init", () => {
  /* ---------------------- Alpine JS ---------------------- */
  Alpine.data("rest_countries", () => {
    return {
      /*------- STRINGS -------*/
      heading: "Countries",
      reqCountry: "",
      region: "",
      /*------- OBJECTS, ARRAYS -------*/
      countryDetails: [],
      // borderNames: [],
      // countries: [],
      countries: json,
      /*------- BOOLEANS  -------*/
      darkMode: true,
      error: false,
      /*------- NUMBERS  -------*/
      /*------- METHODS  -------*/
      // init() {
      //   let max = 4;
      //   json.forEach((country, index) => {
      //     if (max > index) {
      //       console.log(country);
      //       this.countries.push(country);
      //     }
      //   });
      // },
      toggleDarkMode() {
        this.darkMode = !this.darkMode;
      },
      searchForCountry() {
        //loop the countries array
        json.forEach((country) => {
          console.log(this.reqCountry.toLowerCase());
          //if the current country is the country that is being searched for
          //update the countries array, with the matching country's data
          if (country.name.toLowerCase() === this.reqCountry.toLowerCase()) {
            this.countries = [country];
          } else if (this.reqCountry === "") {
            //return the original data when there's no country in the input
            this.countries = json;
          } else if (
            country.name.toLowerCase() !== this.reqCountry.toLowerCase()
          ) {
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
        json.forEach((country) => {
          if (country.region === this.region) {
            this.countries.push(country);
          }
        });
      },
      countryBordersByCode(countryName) {
        json.forEach((country) => {
          //get country details for selected country.
          if (country.name === countryName) {
            // console.log(country);
            this.countryDetails = [country];
            //if selected country has borders,
            if (country.borders) {
              //get last 3 borders for that country.
              country.borders = country.borders.slice(-3);
            }
            //change borders array, from country codes
            //to names, for matching country codes.
            country.borders = this.countryBordersByFullName(country.borders);
          }
        });
      },
      countryBordersByFullName(borders) {
        json.forEach((country) => {
          for (let i = 0; i < borders.length; i++) {
            //get country name for country in the borders arrary
            if (country.alpha3Code === borders[i]) {
              borders.push(country.name);
            }
          }
        });
        borders = borders.slice(3); //get rid of the country codes
        return borders;
      },
    };
  });
});
