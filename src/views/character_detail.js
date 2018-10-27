const PubSub = require("../helpers/pub_sub.js");

const characterDetailView = function(container){
  this.container = container;
};

// bindEvents - not needed probably until we do extensions
// characterDetailView.prototype.bindEvents = function () {
//
// };

characterDetailView.prototype.render = function (character) {
  const characterDetail = document.createElement("div");
  characterDetail.classList.add("character-detail");
  // picture
  const portrait = document.createElement("img");
  portrait.setAttribute("src", character.image);
  portrait.setAttribute("alt", `Portrait of ${character.name}.`)
  portrait.setAttribute("width", "200");
  // (name)
  const characterName = this.createTextElement("h2", character.name);
  console.log("Character Name:", character.name);

  // gender:
  const characterGender = this.createTextElement("p", `Gender: ${character.gender} `);

  // origin:
  const characterOrigin = this.createTextElement("p", `Origin: ${character.origin} `);


  // species:
  const characterSpecies = this.createTextElement("p", `Species: ${character.species} `);

  // type (if exists):
  const characterType = this.createTextElement("p", `Type: ${character.type} `);

  // number of episodes:
  const characterEpidoes = this.createTextElement("p", `Appears in ${character.episode.length} Episodes`);

  // status
  const characterStatus = this.createTextElement("p", `Status: ${character.status} `);

  characterDetail.appendChild(characterName);
  characterDetail.appendChild(portrait);
  characterDetail.appendChild(characterGender);

  return characterDetail;

};

// build it all.

//  create text element
characterDetailView.prototype.createTextElement = function (elementType, text) {
  const element = document.createElement(elementType)
  element.textContent = text;
  return element;
};

// create list element not yet)
// characterDetailView.prototype.methodName = function () {
//
// };

characterDetailView.prototype.clearCharacter = function () {
  this.container.innerHTML = "";
};

// create picture

// handle no type given.
characterDetailView.prototype.createType = function () {
  if (!this.character.type){
    type.textContent = ""
  }else{
    type.textContent = `Type: ${this.character.type} `
  }
  // return?
};

// append that sheeeee-at.

module.exports = characterDetailView;
