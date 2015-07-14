test = require('../node_modules/webrtc-sipstack/test/includes/common')(require('../node_modules/webrtc-core/test/includes/common'));
describe('audio', function() {

  beforeEach(function() {
    test.createModelAndView('sipstack', {
        sipstack: require('webrtc-sipstack')
    });
    test.createModelAndView('audio', {
        audio: require('../'),
        sipstack: require('webrtc-sipstack'),
        sound: require('webrtc-sound')
    });
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
    test.isVisible(audioview.mute, false);
  });
  it('unmute', function() {
    test.isVisible(audioview.unmute, false);
  });
  it('mute on call started', function() {
    sipstack.callState = 'started';
    test.isVisible(audioview.mute, true);
  });
  it('mute on call started and disabled muted', function() {
    audio.enableMute = false;
    sipstack.callState = 'started';
    test.isVisible(audioview.mute, false);
  });
  it('unmute on call started and disabled muted', function() {
    audio.enableMute = false;
    sipstack.callState = 'started';
    test.isVisible(audioview.unmute, false);
  });
  it('mute on call ended', function() {
    audio.enableMute = true;
    sipstack.callState = 'started';
    sipstack.callState = 'connected';
    test.isVisible(audioview.mute, false);
  });
  it('unmute on call ended', function() {
    audio.enableMute = true;
    sipstack.callState = undefined;
    test.isVisible(audioview.mute, false);
    test.isVisible(audioview.unmute, false);
    sipstack.callState = 'started';
    test.isVisible(audioview.mute, true);
    test.isVisible(audioview.unmute, false);
    audioview.mute.trigger("click");
    test.isVisible(audioview.unmute, true);
    test.isVisible(audioview.mute, false);
    audioview.unmute.trigger("click");
    test.isVisible(audioview.unmute, false);
    test.isVisible(audioview.mute, true);
    sipstack.callState = 'connected';
    test.isVisible(audioview.mute, false);
    test.isVisible(audioview.unmute, false);
  });

  it('view', function() {
    audio.enableMute = true;
    sipstack.callState = 'started';
    expect(audio.classes).toEqual(['enableMute', 'started']);
    test.isVisible(audioview.mute, true);
    test.isVisible(audioview.unmute, false);

    audioview.mute.trigger('click');
    expect(audio.classes).toEqual(["muted","enableMute","started"]);
    test.isVisible(audioview.mute, false);
    test.isVisible(audioview.unmute, true);

    audioview.unmute.trigger('click');
    expect(audio.classes).toEqual(['enableMute', 'started']);
    test.isVisible(audioview.mute, true);
    test.isVisible(audioview.unmute, false);
  });
  it('call held', function() {
    sipstack.callState = ['started', 'held'];
    test.isVisible(audioview.mute, true);
  });

});