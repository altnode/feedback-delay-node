import AudioNode from "altnode.audio-node";
import { DELAY, FEEDBACK } from "./symbols";

export default class FeedbackDelayNode extends AudioNode {
  constructor(audioContext, maxDelayTime = 1.0) {
    super(audioContext);

    this[DELAY] = audioContext.createDelay(maxDelayTime);
    this[FEEDBACK] = audioContext.createGain();

    this[DELAY].connect(this[FEEDBACK]);
    this[FEEDBACK].connect(this[DELAY]);
  }

  get delayTime() {
    return this[DELAY].delayTime;
  }

  get feedback() {
    return this[FEEDBACK].gain;
  }

  connect(...args) {
    this[DELAY].connect(...args);
  }

  disconnect(...args) {
    this[DELAY].disconnect(...args);
  }

  dispose() {
    this[DELAY].disconnect();
    this[FEEDBACK].disconnect();
    this[DELAY] = null;
    this[FEEDBACK] = null;
  }

  __connectFrom(source, ...args) {
    source.connect(this[DELAY], ...args);
  }
}
