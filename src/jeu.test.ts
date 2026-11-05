import { describe, it, expect } from "vitest";
import { Jeu } from "./jeu";

describe("Jeu", () => {
  it("annonce Zéro-Zéro au début du match", () => {
    const jeu = new Jeu("Alice", "Bob");

    expect(jeu.score()).toBe("Zéro-Zéro");
  });
});
