import countriesData from "./data.json" assert { type: "json" };
document.addEventListener("alpine:init", () => {
  /* ---------------------- Alpine JS ---------------------- */
  Alpine.data("rest_countries", () => {
    return {
      /*------- OBJECTS, ARRAYS  -------*/
      countries: countriesData,
      /*------- BOOLEANS  -------*/
      darkMode: true,
      toggleDarkMode() {
        this.darkMode = !this.darkMode;
      },
    };
  });
});
