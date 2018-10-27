const PubSub = require("../helpers/pub_sub.js");

const characterDetailView = function(){
};

// bindEvents - not needed probably until we do extensions
// characterDetailView.prototype.bindEvents = function () {
//
// };

characterDetailView.prototype.render = function (character) {

  // picture
  const portrait = document.createElement("img");
  portrait.setAttribute("src", character.image);
  portrait.setAttribute("alt", `Portrait of ${character.name}.`)
  portrait.setAttribute("width", "200");
  // (name)
  const characterName = this.createTextElement("h2", character.name);
  console.log("Character Detail - Character Name:", character.name);

  // gender:

  // origin:

  // species:

  // type (if exists):

  // number of episodes:

  // status



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
