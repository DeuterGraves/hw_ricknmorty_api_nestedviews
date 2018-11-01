const Request = require("../helpers/request.js");
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
    console.log("Characters.js bind events", characterName);
    this.publishCharactersByName(characterName);
  })
};


Characters.prototype.getData = function () {
  const url = "https://rickandmortyapi.com/api/character/";
  const request = new Request(url);
  request.get()
  .then((data) => {
    this.data = data.results
    PubSub.publish("Characters:all-data-ready", data.results)
    // console.log(data);
  })
  .catch((error) => {
    PubSub.publish("Characters:Error", error)
  });
};

Characters.prototype.charactersByName = function (characterName) {
  // console.log("characters by name", characterName);
  // console.log("this data", this.data);
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
    // console.log("everyone else should be shown.");
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
  // console.log("publishCharactersByName", characterName);
  const foundCharacters = this.charactersByName(characterName);
  // console.log(foundCharacters);
  PubSub.publish("Characters:all-data-ready", foundCharacters)

// if statement here -- if characterName == then this:
if (characterName !== "all" || "everyone"){
  selectedCharacter = new SelectedCharacter(characterName, foundCharacters)
  // pubsub here - to trigger a synopsis There are [num] [character]s: [num] are dead, [num] are alive and [num] are MIA.
  // create an object - selected character name and it's array
  PubSub.publish("Characters:main-character-selected", selectedCharacter)
  console.log("selectedCharacter", selectedCharacter);
}

  // function
};


module.exports = Characters;
