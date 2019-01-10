const RequestHelper = require("../helpers/request.js");
const PubSub = require("../helpers/pub_sub.js");
const SelectedCharacter = require("./selected_character.js")

const Characters = function(){
  this.data = null;
};

// bind events - may nore be needed until we add extensions.
Characters.prototype.bindEvents = function () {
  // subscribe for the select view change.
  PubSub.subscribe("SelectView:character-selected", (event) => {
    const characterName = event.detail;
    this.publishCharactersByName(characterName);
  })
};


Characters.prototype.getData = function () {
  const url = "http://localhost:3000/api/characters";
  const requestHelper = new RequestHelper(url);
  requestHelper.get()
  .then((data) => {
    this.data = data.results
    // just page 1
    PubSub.publish("Characters:all-data-ready", data.results)
  })
  .catch((error) => {
    PubSub.publish("Characters:Error", error)
  });
};


Characters.prototype.getPages = function () {
  const url = "http://localhost:3000/api/characters";
  const requestHelper = new RequestHelper(url);
  requestHelper.get()
  .then((data) => {
    this.data = data.info.pages
    this.buildPagesArray(this.data)
  })

};

Characters.prototype.buildPagesArray = function (pages) {
  var i = 0;
  var pagesArray = []
  while(i < pages){
    i++;
    pagesArray.push(`https://rickandmortyapi.com/api/character/?page=${i} `)
  }
  // now call the function that handles promise.all and pass in this array.
  this.getAllCharacters(pagesArray);

};

Characters.prototype.getAllCharacters = function (pagesArray) {
  Promise.all(pagesArray.map(page =>
  fetch(page)
  // .then(checkStatus)
  .then((response) => response.json())
  // .catch(logError)
))
.then (pages =>{
  characterList = []
  for (var page of pages){
    characterList.push(page.results)
  }
  // this.data - here
  characters = characterList.flat()
  //  all characters
  // PubSub.publish("Characters:all-data-ready", characterList);
})
.then((data) => {
  this.data = characters
  // just page 1
  PubSub.publish("Characters:all-data-ready", characters)
})

};

Characters.prototype.charactersByName = function (characterName) {
  let thisData = this.data;
  if (characterName === "all")  {
    return thisData;
  }
  else if (characterName !== "everyone") {
    // for Rick and Morty's family - the main characters.
    return this.data.filter((character) =>{
      characterNameArray = character.name.split(" ");
      mainCharacterList = characterNameArray.includes(characterName);

      return mainCharacterList;
    });
  }
  else{
    // return data without rick, morty, summer, jerry, beth.

    return this.data.filter((character) => {
      characterNameArray = character.name.split(" ");
      let option = true
      if (characterNameArray.includes("Rick") || characterNameArray.includes("Morty")  || characterNameArray.includes("Summer")  || characterNameArray.includes("Beth")  || characterNameArray.includes("Jerry")){
        option = false
      }

      return option;

    })
  }

};

Characters.prototype.publishCharactersByName = function (characterName) {
  const foundCharacters = this.charactersByName(characterName);
  PubSub.publish("Characters:all-data-ready", foundCharacters);

  let alert = true
  if (characterName === "all") {
    alert = false;
    PubSub.publish("Characters:others-selected", "All");
    // set summaryContainer to empty?
  }else if (characterName === "everyone") {
    alert = false;
    PubSub.publish("Characters:others-selected", "Non-Sanchez/Smith Family");
    // set summaryContainer to empty?
  }else{
    alert = true;
  };
  // if statement here -- if characterName == then this:
  if (alert) {
    selectedCharacter = new SelectedCharacter(characterName, foundCharacters)
    // pubsub here - to trigger a synopsis There are [num] [character]s: [num] are dead, [num] are alive and [num] are MIA.
    // create an object - selected character name and it's array
    PubSub.publish("Characters:main-character-selected", selectedCharacter)
  }
  else{
    // let message = "Did this work?"
    // PubSub.publish("Characters:others-selected", message);

  }

  // function
};


module.exports = Characters;
