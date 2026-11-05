import { describe, it, expect } from "vitest";
import { MatchEnUnSet } from "./match-en-un-set";

describe("MatchEnUnSet", () => {
  const classementInutile = { enregistrer: () => {} };

  it("commence à Zéro-Zéro", () => {
    const match = new MatchEnUnSet("Alice", "Bob", classementInutile);

    expect(match.score()).toBe("Zéro-Zéro");
  });
});
