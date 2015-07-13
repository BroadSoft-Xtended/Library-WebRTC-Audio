var jsdom = require('mocha-jsdom');
expect = require('expect');
jsdom({});

describe('audio', function() {

  beforeEach(function() {
    core = require('webrtc-core');
    testUA = core.testUA;
    testUA.createModelAndView('sipstack', {
        sipstack: require('webrtc-sipstack')
    });
    testUA.createModelAndView('audio', {
        audio: require('../'),
        sipstack: require('webrtc-sipstack'),
        sound: require('webrtc-sound')
    });
    testUA.mockWebRTC();
  });

  it('mute', function() {
    var audioTrack1 = {enabled: true};
    sipstack.getLocalStreams = function(){
      return [{getAudioTracks: function(){
        return [audioTrack1];
      }}]
    };
    audio.mute();
    expect(sipstack.getLocalStreams()[0].getAudioTracks()[0].enabled).toEqual(false);

    audio.unmute();
    expect(sipstack.getLocalStreams()[0].getAudioTracks()[0].enabled).toEqual(true);
  });
  it('mute', function() {
    testUA.isVisible(audioview.mute, false);
  });
  it('unmute', function() {
    testUA.isVisible(audioview.unmute, false);
  });
  it('mute on call started', function() {
    sipstack.callState = 'started';
    testUA.isVisible(audioview.mute, true);
  });
  it('mute on call started and disabled muted', function() {
    audio.enableMute = false;
    sipstack.callState = 'started';
    testUA.isVisible(audioview.mute, false);
  });
  it('unmute on call started and disabled muted', function() {
    audio.enableMute = false;
    sipstack.callState = 'started';
    testUA.isVisible(audioview.unmute, false);
  });
  it('mute on call ended', function() {
    audio.enableMute = true;
    sipstack.callState = 'started';
    sipstack.callState = 'connected';
    testUA.isVisible(audioview.mute, false);
  });
  it('unmute on call ended', function() {
    audio.enableMute = true;
    sipstack.callState = undefined;
    testUA.isVisible(audioview.mute, false);
    testUA.isVisible(audioview.unmute, false);
    sipstack.callState = 'started';
    testUA.isVisible(audioview.mute, true);
    testUA.isVisible(audioview.unmute, false);
    audioview.mute.trigger("click");
    testUA.isVisible(audioview.unmute, true);
    testUA.isVisible(audioview.mute, false);
    audioview.unmute.trigger("click");
    testUA.isVisible(audioview.unmute, false);
    testUA.isVisible(audioview.mute, true);
    sipstack.callState = 'connected';
    testUA.isVisible(audioview.mute, false);
    testUA.isVisible(audioview.unmute, false);
  });

  it('view', function() {
    audio.enableMute = true;
    sipstack.callState = 'started';
    expect(audio.classes).toEqual(['enableMute', 'started']);
    testUA.isVisible(audioview.mute, true);
    testUA.isVisible(audioview.unmute, false);

    audioview.mute.trigger('click');
    expect(audio.classes).toEqual(["muted","enableMute","started"]);
    testUA.isVisible(audioview.mute, false);
    testUA.isVisible(audioview.unmute, true);

    audioview.unmute.trigger('click');
    expect(audio.classes).toEqual(['enableMute', 'started']);
    testUA.isVisible(audioview.mute, true);
    testUA.isVisible(audioview.unmute, false);
  });
  it('call held', function() {
    sipstack.callState = ['started', 'held'];
    testUA.isVisible(audioview.mute, true);
  });

});