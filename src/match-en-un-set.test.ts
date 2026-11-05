import { describe, it, expect } from "vitest";
import { MatchEnUnSet } from "./match-en-un-set";

function gagnerUnJeu(match: MatchEnUnSet, joueur: string) {
  for (let i = 0; i < 4; i++) match.pointPour(joueur);
}

describe("MatchEnUnSet", () => {
  const classementInutile = { enregistrer: () => {} };

  it("commence à Zéro-Zéro", () => {
    const match = new MatchEnUnSet("Alice", "Bob", classementInutile);

    expect(match.score()).toBe("Zéro-Zéro");
  });

  it("gagner un jeu rapporte un jeu au joueur", () => {
    const match = new MatchEnUnSet("Alice", "Bob", classementInutile);

    gagnerUnJeu(match, "Alice");

    expect(match.jeuxGagnes("Alice")).toBe(1);
  });
});
