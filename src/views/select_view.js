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

// DO A DROP DOWN - treat characternames as arrays with split"" go for uniques
// maybe have rick/morty/ summer/ etc as items and then have "else/other/everyone else as the last drop down item. "

module.exports = SelectView;
