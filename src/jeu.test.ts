import { describe, it, expect } from "vitest";
import { Jeu } from "./jeu";

describe("Jeu", () => {
  it("annonce Zéro-Zéro au début du match", () => {
    const jeu = new Jeu("Alice", "Bob");

    expect(jeu.score()).toBe("Zéro-Zéro");
  });

  it("annonce Quinze quand un joueur a marqué un point", () => {
    const jeu = new Jeu("Alice", "Bob");

    jeu.pointPour("Alice");

    expect(jeu.score()).toBe("Quinze-Zéro");
  });

  it("annonce A quand les deux joueurs ont le même score", () => {
    const jeu = new Jeu("Alice", "Bob");

    jeu.pointPour("Alice");
    jeu.pointPour("Bob");

    expect(jeu.score()).toBe("Quinze-A");
  });
});
