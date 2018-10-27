// require the stuffs here
const Request = require("./helpers/request.js");
const Characters = require("./models/characters.js");
const CharacterListView = require("./views/characters_list_view.js")

document.addEventListener("DOMContentLoaded", () => {
  console.log("Javascript Loaded - Time to hold on tight, Morty.");

  const listContainer = document.querySelector("section#characters-view");
  const characterListView = new CharacterListView(listContainer);
  characterListView.bindEvents()

  // call your bind TidalEvents
  // iteration one - get data call here.

  const characters = new Characters();
  characters.getData()

})
