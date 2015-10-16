# altnode.FeedbackDelayNode
[![Build Status](http://img.shields.io/travis/altnode/feedback-delay-node.svg?style=flat-square)](https://travis-ci.org/altnode/feedback-delay-node)
[![NPM Version](http://img.shields.io/npm/v/altnode.feedback-delay-node.svg?style=flat-square)](https://www.npmjs.org/package/altnode.feedback-delay-node)
[![License](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](http://mohayonao.mit-license.org/)

## Installation

```
npm install -S altnode.feedback-delay-node
```

## API
### AudioNode
- `constructor(audioContext: AudioContext, maxDelayTime = 1)`

#### Instance attributes
- `delayTime: AudioParam`
- `feedback: AudioParam`

## Example

```js
import FeedbackDelayNode from "altnode.feedback-delay-node";

let audioContext = new AudioContext();
let bufSrc = audioContext.createBufferSource();
let delay = new FeedbackDelayNode(audioContext);

bufSrc.buffer = RhythmLoop;
bufSrc.loop = true;
bufSrc.start();
bufSrc.connect(delay);

delay.delayTime.value = 0.75;
delay.feedback.value = 0.9;
delay.connect(audioContext.destination);
```

## LICENSE
MIT
