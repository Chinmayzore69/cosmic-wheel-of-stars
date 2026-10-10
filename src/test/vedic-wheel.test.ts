import { describe, expect, it } from "vitest";
import { angularDelta, rashis } from "@/lib/vedic-wheel";

describe("Vedic wheel", () => {
  it("includes all twelve Hindu zodiac signs with distinct symbols", () => {
    expect(rashis.map(([name]) => name)).toEqual([
      "मेष",
      "वृषभ",
      "मिथुन",
      "कर्क",
      "सिंह",
      "कन्या",
      "तुला",
      "वृश्चिक",
      "धनु",
      "मकर",
      "कुम्भ",
      "मीन",
    ]);
    expect(new Set(rashis.map((rashi) => rashi[2])).size).toBe(12);
  });
  it("allows clockwise and anticlockwise rotation", () => {
    expect(angularDelta(10, 40)).toBe(30);
    expect(angularDelta(40, 10)).toBe(-30);
  });
  it("does not jump when a drag crosses the angle boundary", () => {
    expect(angularDelta(179, -179)).toBe(2);
    expect(angularDelta(-179, 179)).toBe(-2);
  });
});
