const PubSub = require("../helpers/pub_sub.js");
const CharacterDetail = require("./character_detail.js");

const CharacterListView = function(container){
  this.container = container;
};

CharacterListView.prototype.bindEvents = function(){
  PubSub.subscribe("Characters:all-data-ready", (event)=>{
    this.renderCharacterDetailViews(event.detail);
  });
};

CharacterListView.prototype.renderCharacterDetailViews = function (characters) {
  const ricks = characters.results
  ricks.forEach((rick) => {
    const characterItem = this.createCharacterListItem(rick);
    // once the character build is ready uncomment:
    // this.container.appendChild(characterItem);
  });
};

CharacterListView.prototype.createCharacterListItem = function (character) {
  console.log(character);
  // const characterDetailView = new CharacterDetailView();
  // const characterDetail = characterDetailView.createCharacterDetail(character);
  // return characterDetail;

};


module.exports = CharacterListView;
