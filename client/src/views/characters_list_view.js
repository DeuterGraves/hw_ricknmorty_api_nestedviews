const PubSub = require("../helpers/pub_sub.js");
const CharacterDetailView = require("./character_detail.js");

const CharacterListView = function(container){
  this.container = container;
};

CharacterListView.prototype.bindEvents = function(){
  PubSub.subscribe("Characters:main-character-selected", (event) => {
    // render character synopsis
    const characterSummary = this.renderCharacterSummary(event.detail);
    // goes above the grid.
    console.log("Main Character!!", event.detail);
  })
  PubSub.subscribe("Characters:all-data-ready", (event)=>{
    // console.log("data ready list view bindevents", event.detail);
    this.clearList();
    this.renderCharacterDetailViews(event.detail);
  });
  PubSub.subscribe("Characters:others-selected", (event)=>{
    this.clearCharacterSummary(event.detail);
  })
};

CharacterListView.prototype.getNumAlive = function(characterList){
  let numAlive = 0
  characterList.forEach((character) => {
    if (character.status === "Alive"){
      numAlive ++;
    };
  });
  return numAlive;
}

CharacterListView.prototype.getNumDead = function(characterList){
  let numDead = 0
  characterList.forEach((character) => {
    if (character.status === "Dead"){
      numDead ++;
    };
  });
  return numDead
}

CharacterListView.prototype.getNumMIA = function(characterList){
  let numMIA = 0
  characterList.forEach((character) => {
    if (character.status === "unknown"){
      numMIA ++;
    };
  });
  return numMIA
}

CharacterListView.prototype.renderCharacterSummary = function (mainCharacterObject) {
  const characterList = mainCharacterObject.characterList
  const characterName = mainCharacterObject.characterName

// refactor - get numAlive
let numAlive = this.getNumAlive(characterList);
let numDead = this.getNumDead(characterList);
let numMIA = this.getNumMIA(characterList);

  // let numAlive = 0
  // characterList.forEach((character) => {
  //   if (character.status === "Alive"){
  //     numAlive ++;
  //   };
  // });

// refactor - get numDead
  // let numDead = 0
  // characterList.forEach((character) => {
  //   if (character.status === "Dead"){
  //     numDead ++;
  //   };
  // });

// refactor - get numMIA
  // let numMIA = 0
  // characterList.forEach((character) => {
  //   if (character.status === "unknown"){
  //     numMIA ++;
  //   };
  // });

  const summaryContainer = document.querySelector("section#character-summary");
  const pickleRick = document.createElement("p");
  pickleRick.classList.add("character-summary");
  pickleRick.textContent = `There are ${characterList.length}  ${characterName}s, ${numAlive} are alive, ${numDead} are dead, and ${numMIA} are MIA.`;
  summaryContainer.innerHTML = "";
  summaryContainer.appendChild(pickleRick);
  // console.log("I'm pickle rick.");
};

CharacterListView.prototype.clearCharacterSummary = function (who) {
  let summaryContainer = document.querySelector("section#character-summary");
  let characterText = document.createElement("p");
  characterText.classList.add("character-summary");
  characterText.textContent = `${who}  Characters Listed:`;
  summaryContainer.innerHTML = "";
  // pickleRick.innerHTML = "NONE!";
  summaryContainer.appendChild(characterText);

};

CharacterListView.prototype.renderCharacterDetailViews = function (characters) {
  // const characters = characters
  characters.forEach((character) => {
    const characterItem = this.createCharacterListItem(character);
    // console.log(rick);
    // once the character build is ready uncomment:
    this.container.appendChild(characterItem);
    // console.log(this.container);
  });
};

CharacterListView.prototype.createCharacterListItem = function (character) {
  // console.log(character);
  const characterDetailView = new CharacterDetailView();
  const characterDetail = characterDetailView.render(character);
  return characterDetail;
  // console.log("character detail", characterDetail);

};

CharacterListView.prototype.clearList = function () {
  this.container.innerHTML = "";
};



module.exports = CharacterListView;
