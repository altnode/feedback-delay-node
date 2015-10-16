import assert from "power-assert";
import index from "../src";
import FeedbackDelayNode from "../src/FeedbackDelayNode";

describe("index", () => {
  it("exports", () => {
    assert(index === FeedbackDelayNode);
  });
});
