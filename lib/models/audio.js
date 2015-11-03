module.exports = require('bdsft-sdk-model')(Audio, {
  config: require('../../js/config')
});

var utils = require('webrtc-core').utils;

function Audio(eventbus, sipstack, urlconfig) {
  var self = {};

  self.updateLocalAudio = function() {
    enableLocalAudio(!self.muted);
  };

  var enableLocalAudio = function(enabled) {
    var localStreams = sipstack.getLocalStreams();
    if (!localStreams || localStreams.length === 0) {
      return;
    }
    var localMedia = localStreams[0];
    var localAudio = localMedia.getAudioTracks()[0];
    localAudio.enabled = enabled;
  };

  self.props = ['muted', 'classes'];

  self.bindings = {
    classes: {
        audio: ['muted', 'enableMute'],
        sipstack: 'callState'
      },
    localAudio: {
      audio: 'muted'
    },
    enableMute: {
      urlconfig: 'enableMute'
    }
  };

  self.mute = function() {
    self.muted = true;
  };

  self.unmute = function() {
    self.muted = false;
  };
  
  self.listeners = function() {
    eventbus.on(["resumed", "started", "userMediaUpdated"], function() {
      self.updateLocalAudio();
    });
  };

  return self;
}
