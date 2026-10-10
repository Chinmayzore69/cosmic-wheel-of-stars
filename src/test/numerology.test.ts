import { describe, expect, it } from "vitest";
import { calculateNumbers, reduceNumber } from "@/lib/numerology";

describe("Documented digit-sum numerology", () => {
  it("sums every digit of 1995-08-14 to life path 1", () => {
    expect(calculateNumbers("1995-08-14").lifePath).toBe(1);
  });
  it("reduces birth day 14 to 5", () => {
    expect(calculateNumbers("1995-08-14").birthNumber).toBe(5);
  });
  it.each([11, 22, 33])("preserves master number %i", (value) => {
    expect(reduceNumber(value)).toBe(value);
  });
  it("rejects impossible dates", () => {
    expect(() => calculateNumbers("2024-02-31")).toThrow();
  });
  it("rejects future dates", () => {
    expect(() => calculateNumbers("2999-01-01")).toThrow();
  });
});
