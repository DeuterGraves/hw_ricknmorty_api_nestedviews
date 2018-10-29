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
};



Characters.prototype.getData = function () {
  const url = "https://rickandmortyapi.com/api/character/";
  const request = new Request(url);
  request.get()
  .then((data) => {
    this.data = data
    PubSub.publish("Characters:all-data-ready", data)
    // console.log(data);
  })
  .catch((error) => {
    PubSub.publish("Characters:Error", error)
  });
};


module.exports = Characters;
