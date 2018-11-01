// require the stuffs here
const Request = require("./helpers/request.js");
const Characters = require("./models/characters.js");
const CharacterListView = require("./views/characters_list_view.js");
const SelectView = require("./views/select_view.js");

document.addEventListener("DOMContentLoaded", () => {
  console.log("Javascript Loaded - Time to hold on tight, Morty.");

  const listContainer = document.querySelector("#characters-view");
  const characterListView = new CharacterListView(listContainer);
  characterListView.bindEvents()


  const characters = new Characters();
  characters.bindEvents();
  characters.getData();

  // call your  bindEvents

  const menu = document.querySelector("nav.character-menu");
  const characterMenu = new SelectView(menu);
  characterMenu.bindEvents();


})
