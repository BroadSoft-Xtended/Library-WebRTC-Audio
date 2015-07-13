module.exports = require('webrtc-core').bdsft.View(AudioView, {
  template: require('../../js/templates'), 
  style: require('../../js/styles')
});

function AudioView(audio, sound) {
  var self = {};

  self.elements = ['mute', 'unmute'];

  var clickHander = function(callback){
    return function(e) {
      e.preventDefault();
      sound.playClick();
      callback();
    }
  }

  self.listeners = function() {
    self.mute.bind('click', clickHander(function() {
      audio.mute();
    }));
    self.unmute.bind('click', clickHander(function() {
      audio.unmute();
    }));
  };

  return self;
}