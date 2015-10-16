import assert from "power-assert";
import FeedbackDelayNode from "../src/FeedbackDelayNode";
import { DELAY, FEEDBACK } from "../src/symbols";

describe("FeedbackDelayNode", () => {
  let audioContext;

  beforeEach(() => {
    audioContext = new global.AudioContext();
  });

  describe("constructor(audioContext: AudioContext, maxDelayTime: number = 1.0)", () => {
    it("works", () => {
      let feedbackDelay = new FeedbackDelayNode(audioContext, 2);

      assert(feedbackDelay instanceof FeedbackDelayNode);
      assert(feedbackDelay[DELAY].$maxDelayTime === 2);
      assert(feedbackDelay[DELAY] instanceof global.DelayNode);
      assert(feedbackDelay[FEEDBACK] instanceof global.GainNode);
    });
    it("works without maxDelayTime", () => {
      let feedbackDelay = new FeedbackDelayNode(audioContext);

      assert(feedbackDelay instanceof FeedbackDelayNode);
      assert(feedbackDelay[DELAY].$maxDelayTime === 1);
      assert(feedbackDelay[DELAY] instanceof global.DelayNode);
      assert(feedbackDelay[FEEDBACK] instanceof global.GainNode);
    });
  });
  describe("#delayTime: AudioParam", () => {
    it("works", () => {
      let feedbackDelay = new FeedbackDelayNode(audioContext);

      assert(feedbackDelay.delayTime instanceof global.AudioParam);
      assert(feedbackDelay.delayTime === feedbackDelay[DELAY].delayTime);
    });
  });
  describe("#feedback: AudioParam", () => {
    it("works", () => {
      let feedbackDelay = new FeedbackDelayNode(audioContext);

      assert(feedbackDelay.feedback instanceof global.AudioParam);
      assert(feedbackDelay.feedback === feedbackDelay[FEEDBACK].gain);
    });
  });
  describe("#connect(...args): void", () => {
    it("works", () => {
      let feedbackDelay = new FeedbackDelayNode(audioContext);

      feedbackDelay.connect(audioContext.destination);

      assert(audioContext.destination.$isConnectedFrom(feedbackDelay[DELAY]));
    });
  });
  describe("#disconnect(...args): void", () => {
    it("works", () => {
      let feedbackDelay = new FeedbackDelayNode(audioContext);

      feedbackDelay.connect(audioContext.destination);
      feedbackDelay.disconnect();

      assert(!audioContext.destination.$isConnectedFrom(feedbackDelay[DELAY]));
    });
  });
  describe("#dispose(): void", () => {
    it("works", () => {
      let feedbackDelay = new FeedbackDelayNode(audioContext);

      feedbackDelay.connect(audioContext.destination);
      feedbackDelay.dispose();

      assert(!audioContext.destination.$isConnectedFrom(feedbackDelay[DELAY]));

      assert.throws(() => {
        feedbackDelay.dispose();
      });
    });
  });
  describe("connected from", () => {
    it("works", () => {
      let oscillator = audioContext.createOscillator();
      let feedbackDelay = new FeedbackDelayNode(audioContext);

      oscillator.connect(feedbackDelay);

      feedbackDelay[DELAY].$isConnectedFrom(oscillator);
    });
  });
  describe("graph", () => {
    it("works", () => {
      let feedbackDelay = new FeedbackDelayNode(audioContext);

      feedbackDelay.connect(audioContext.destination);

      assert(audioContext.destination.toJSON(), {
        name: "AudioDestinationNode",
        inputs: [
          {
            name: "DelayNode",
            delayTime: {
              value: 0,
              inputs: []
            },
            inputs: [
              {
                name: "GainNode",
                gain: {
                  value: 1,
                  inputs: []
                },
                inputs: [
                  "<circular:DelayNode>"
                ]
              }
            ]
          }
        ]
      });
    });
  });
});
