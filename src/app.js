// require the stuffs here
const Request = require("./helpers/request.js");
const Characters = require("./models/characters.js");

document.addEventListener("DOMContentLoaded", () => {
  console.log("Javascript Loaded - Time to hold on tight, Morty.");

  // call your bind TidalEvents
  // iteration one - get data call here.

  const characters = new Characters();
  characters.getData()

})
