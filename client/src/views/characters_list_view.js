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

CharacterListView.prototype.getCharacterCount = function (characterList) {
  return characterList.length;
};

CharacterListView.prototype.getStatusCounts = function(characterList){
  let numAlive = 0;
  let numDead = 0;
  let numMIA = 0;
  let statusCounts = []

  characterList.forEach((character) => {
    if (character.status === "Alive"){
      numAlive ++;
    }
    else if (character.status === "Dead") {
      numDead ++;
    }
    else if (character.status === "unknown") {
      numMIA ++;
    }
  });
  statusCounts.push(numAlive);
  statusCounts.push(numDead);
  statusCounts.push(numMIA);
  return statusCounts;
}


CharacterListView.prototype.renderCharacterSummary = function (mainCharacterObject) {
  const characterList = mainCharacterObject.characterList
  const characterName = mainCharacterObject.characterName

  let statusCounts = this.getStatusCounts(characterList);
  let numAlive = statusCounts[0]
  let numDead = statusCounts[1]
  let numMIA = statusCounts[2]
  let characterCount = this.getCharacterCount(characterList);

  const summaryContainer = document.querySelector("section#character-summary");
  const sumParagraph = document.createElement("p");
  sumParagraph.classList.add("character-summary");

  sumParagraph.textContent = `There are ${characterCount}  ${characterName}s, ${numAlive} are alive, ${numDead} are dead, and ${numMIA} are MIA.`;

  summaryContainer.innerHTML = "";
  summaryContainer.appendChild(sumParagraph);
};

CharacterListView.prototype.clearCharacterSummary = function (who) {
  let summaryContainer = document.querySelector("section#character-summary");
  let characterText = document.createElement("p");
  characterText.classList.add("character-summary");
  characterText.textContent = `${who}  Characters Listed:`;
  summaryContainer.innerHTML = "";
  // sumParagraph.innerHTML = "NONE!";
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
