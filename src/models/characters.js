const Request = require("../helpers/request.js");
const PubSub = require("../helpers/pub_sub.js");

const Characters = function(){
  this.data = null;
  // data prepare for character dropdown list.
  // this.characterNames = []
};

// bind events - may nore be needed until we add extensions.
Characters.prototype.bindEvents = function () {
  // subscribe for the select view change.
  PubSub.subscribe("SelectView:character-selected", (event) => {
    const characterName = event.detail;
    console.log("bind events", characterName);
    this.publishCharactersByName(characterName);
    // need a function to filter the characters by name.
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
  console.log("characters by name", characterName);
  console.log("this data", this.data);
  let thisData = this.data;
  if (characterName === "all")  {
    return thisData;
  }
  else if (characterName !== "everyone") {
    return this.data.filter((character) =>{
      // if the names would match.
      // characterNameArray = listedCharacterName.split(" ");
      characterNameArray = character.name.split(" ");
      return characterNameArray.includes(characterName);
    });
  }
  else{
    console.log("everyone else should be shown.");
    // return this.data;
    // return data without rick, morty, summer, jerry, beth.

    return this.data.filter((character) => {
      characterNameArray = character.name.split(" ");
      let option = true
      if (characterNameArray.includes("Rick") || characterNameArray.includes("Morty")  || characterNameArray.includes("Summer")  || characterNameArray.includes("Beth")  || characterNameArray.includes("Jerry")){
        option = false
      }
      // if (characterNameArray.includes("Morty")){
      //   option = false
      // }




      return option;

      // return characterNameArray.includes(!"Rick" && !"Morty" && !"Summer" && !"Beth" && !"Jerry")
    })
  }

};

Characters.prototype.publishCharactersByName = function (characterName) {
  // console.log("publishCharactersByName", characterName);
  // for the characters NAMED - splice characters.name and return any object that had 'rick' 'morty' etc as part of the charnacter name.
  // for everyone else - return anyone who's NONE of the other 5.
  const foundCharacters = this.charactersByName(characterName);
  console.log(foundCharacters);
  PubSub.publish("Characters:all-data-ready", foundCharacters)
};



module.exports = Characters;
