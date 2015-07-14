# Audio

Handles audio streams.

Model : bdsft_webrtc.default.audio
View : bdsft_webrtc.default.audioview
Dependencies : [SIP Stack](https://github.com/BroadSoft-Xtended/Library-WebRTC-SIPStack), [Sound](https://github.com/BroadSoft-Xtended/Library-WebRTC-Sound)

## Elements
<a name="elements"></a>

Element             |Type  |Description
--------------------|------|------------------------------------------
mute                 |div   |Mutes the outgoing local audio stream.
unmute               |div   |Unmutes the outgoing local audio stream.

## Properties
<a name="properties"></a>

Property  |Type     |Description
----------|---------|------------------------------------------
muted     |boolean  |True if the local audio stream is muted.

## Configuration
<a name="configuration"></a>

Property    |Type     |Default  |Description
------------|---------|---------|-------------------------------
enableMute  |boolean  |true     |True if mute icon is enabled.

## Methods
<a name="methods"></a>

Method    |Parameter  |Description
----------|-----------|---------------------------------
mute()    |           |Mutes the local audio stream.
unmute()  |           |Unmutes the local audio stream.

