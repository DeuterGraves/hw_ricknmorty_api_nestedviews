const PubSub = require("../helpers/pub_sub.js");
const CharacterDetailView = require("./character_detail.js");

const CharacterListView = function(container){
  this.container = container;
};

CharacterListView.prototype.bindEvents = function(){
  PubSub.subscribe("Characters:all-data-ready", (event)=>{
    console.log("data ready list view bindevents", event.detail);
    this.clearList();
    this.renderCharacterDetailViews(event.detail);
  });
  PubSub.subscribe("Characters:main-character-selected", (event) => {
    // render character synopsis
    const characterSummary = this.renderCharacterSummary(event.detail);
    // goes above the grid.
    // console.log("Main Character!!", event.detail);
  })
};

CharacterListView.prototype.renderCharacterSummary = function (mainCharacterObject) {
  const pickleRick = document.createElement("p")
  pickleRick.classList.add("character-summary")
  pickleRick.textContent = `There are ${mainCharacterObject.characterList.length}  ${mainCharacterObject.characterName}s, [num] are alive, [num] are dead, and [num] are MIA.`
  this.container.appendChild(pickleRick)
  // console.log("I'm pickle rick.");

};

CharacterListView.prototype.renderCharacterDetailViews = function (characters) {
  const ricks = characters
  ricks.forEach((rick) => {
    const characterItem = this.createCharacterListItem(rick);
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
