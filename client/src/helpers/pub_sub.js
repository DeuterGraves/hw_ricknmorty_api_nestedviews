const PubSub = {
  publish: function(channel, payload){
    const event = new CustomEvent(channel, {
      detail: payload
    });
    document.dispatchEvent(event);
    // console.log(`${payload} published on ${channel}  `);
  },

  subscribe: function(channel, callback){
    document.addEventListener(channel, callback);
    // console.log(`${channel} heard `);
  }
};

module.exports = PubSub;
