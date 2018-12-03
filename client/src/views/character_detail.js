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
  const characterLine = document.createElement("hr");

  // gender:
  const characterGender = this.createTextElement("p", `Gender: ${character.gender} `);

  // origin:
  const characterOrigin = this.createTextElement("p", `Origin: ${character.origin.name} `);

  // species:
  const characterSpecies = this.createTextElement("p", `Species: ${character.species} `);

  const characterType = document.createElement("p");
  // if (!character.type){
  //   characterType.textContent = ""
  // }else{
  //   characterType.textContent = `Type: ${character.type} `
  // }
  // javascript ternary if/else - no other option.
  !character.type ? characterType.textContent = "" : characterType.textContent = `Type: ${character.type} `
  // return characterType;
// };

  // number of episodes:
  const characterEpidoes = this.createTextElement("p", `Appears in ${character.episode.length} Episodes`);

  // status
  const characterStatus = this.createTextElement("p", `Status: ${character.status} `);

  characterDetail.appendChild(characterName);
  characterDetail.appendChild(characterLine);
  characterDetail.appendChild(characterStatus);
  characterDetail.appendChild(portrait);
  characterDetail.appendChild(characterGender);
  characterDetail.appendChild(characterOrigin);
  characterDetail.appendChild(characterSpecies);
  characterDetail.appendChild(characterType);
  characterDetail.appendChild(characterEpidoes);

  return characterDetail;

};


//  create text element
characterDetailView.prototype.createTextElement = function (elementType, text) {
  const element = document.createElement(elementType)
  element.textContent = text;
  return element;
};



module.exports = characterDetailView;
