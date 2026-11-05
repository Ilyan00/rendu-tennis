import { describe, it, expect, vi } from "vitest";
import { Jeu } from "./jeu";

describe("Jeu", () => {
  it("annonce Zéro-Zéro au début du match", () => {
    const jeu = new Jeu("Alice", "Bob", { enregistrer: () => {} });

    expect(jeu.score()).toBe("Zéro-Zéro");
  });

  it("annonce Quinze quand un joueur a marqué un point", () => {
    const jeu = new Jeu("Alice", "Bob", { enregistrer: () => {} });

    jeu.pointPour("Alice");

    expect(jeu.score()).toBe("Quinze-Zéro");
  });

  it("annonce A quand les deux joueurs ont le même score", () => {
    const jeu = new Jeu("Alice", "Bob", { enregistrer: () => {} });

    jeu.pointPour("Alice");
    jeu.pointPour("Bob");

    expect(jeu.score()).toBe("Quinze-A");
  });

  it("annonce Égalité à Quarante partout", () => {
    const jeu = new Jeu("Alice", "Bob", { enregistrer: () => {} });

    for (let i = 0; i < 3; i++) {
      jeu.pointPour("Alice");
      jeu.pointPour("Bob");
    }
    expect(jeu.score()).toBe("Égalité");
  });

  it("le joueur qui marque à Quarante gagne le match", () => {
    const jeu = new Jeu("Alice", "Bob", { enregistrer: () => {} });

    for (let i = 0; i < 4; i++) {
      jeu.pointPour("Alice");
    }

    expect(jeu.score()).toBe("Victoire Alice");
  });

  it("à Égalité, le point suivant gagne le match", () => {
    const jeu = new Jeu("Alice", "Bob", { enregistrer: () => {} });

    for (let i = 0; i < 3; i++) {
      jeu.pointPour("Alice");
      jeu.pointPour("Bob");
    }
    jeu.pointPour("Bob");

    expect(jeu.score()).toBe("Victoire Bob");
  });

  it("enregistre le vainqueur puis le perdant à la fin du match", () => {
    const classement = { enregistrer: vi.fn() };
    const jeu = new Jeu("Alice", "Bob", classement);

    for (let i = 0; i < 4; i++) {
      jeu.pointPour("Alice");
    }

    expect(classement.enregistrer).toHaveBeenCalledWith("Alice", "Bob");
  });

  it("enregistre le résultat une seule fois, même si on marque après la fin", () => {
    const classement = { enregistrer: vi.fn() };
    const jeu = new Jeu("Alice", "Bob", classement);

    for (let i = 0; i < 3; i++) {
      jeu.pointPour("Alice");
      jeu.pointPour("Bob");
    }
    jeu.pointPour("Alice");
    jeu.pointPour("Bob");

    expect(classement.enregistrer).toHaveBeenCalledOnce();
  });
});
