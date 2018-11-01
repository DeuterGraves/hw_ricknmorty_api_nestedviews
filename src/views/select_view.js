const PubSub = require("../helpers/pub_sub.js")


// constructor
const SelectView = function(menu){
  this.menu = menu;
};

// bindEvents
SelectView.prototype.bindEvents = function () {
  this.menu.addEventListener("change", (event) => {
    const characterName = event.target.value;
    PubSub.publish("SelectView:character-selected", characterName)
    // console.log(characterName);
  });
};


module.exports = SelectView;
