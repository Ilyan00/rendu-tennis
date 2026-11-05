import { describe, it, expect, vi } from "vitest";
import { Jeu } from "./jeu";

describe("Jeu", () => {
  // Dummy : le constructeur demande un classement mais ces tests ne s'en servent pas, donc un objet vide suffit.
  const classementInutile = { enregistrer: () => {} };

  it("annonce Zéro-Zéro au début du match", () => {
    const jeu = new Jeu("Alice", "Bob", classementInutile);

    expect(jeu.score()).toBe("Zéro-Zéro");
  });

  it("annonce Quinze quand un joueur a marqué un point", () => {
    const jeu = new Jeu("Alice", "Bob", classementInutile);

    jeu.pointPour("Alice");

    expect(jeu.score()).toBe("Quinze-Zéro");
  });

  it("annonce A quand les deux joueurs ont le même score", () => {
    const jeu = new Jeu("Alice", "Bob", classementInutile);

    jeu.pointPour("Alice");
    jeu.pointPour("Bob");

    expect(jeu.score()).toBe("Quinze-A");
  });

  it("annonce Égalité à Quarante partout", () => {
    const jeu = new Jeu("Alice", "Bob", classementInutile);

    for (let i = 0; i < 3; i++) {
      jeu.pointPour("Alice");
      jeu.pointPour("Bob");
    }
    expect(jeu.score()).toBe("Égalité");
  });

  it("le joueur qui marque à Quarante gagne le match", () => {
    const jeu = new Jeu("Alice", "Bob", classementInutile);

    for (let i = 0; i < 4; i++) {
      jeu.pointPour("Alice");
    }

    expect(jeu.score()).toBe("Victoire Alice");
  });

  it("à Égalité, le point suivant gagne le match", () => {
    const jeu = new Jeu("Alice", "Bob", classementInutile);

    for (let i = 0; i < 3; i++) {
      jeu.pointPour("Alice");
      jeu.pointPour("Bob");
    }
    jeu.pointPour("Bob");

    expect(jeu.score()).toBe("Victoire Bob");
  });

  it("enregistre le vainqueur puis le perdant à la fin du match", () => {
    // Spy : je veux vérifier qu'enregistrer est bien appelé et avec quoi. Pas besoin d'un stub, enregistrer ne renvoie rien.
    const classement = { enregistrer: vi.fn() };
    const jeu = new Jeu("Alice", "Bob", classement);

    for (let i = 0; i < 4; i++) {
      jeu.pointPour("Alice");
    }

    expect(classement.enregistrer).toHaveBeenCalledWith("Alice", "Bob");
  });

  it("enregistre le résultat une seule fois, même si on marque après la fin", () => {
    // Spy : je veux compter combien de fois enregistrer est appelé. Un stub ne retient pas ses appels, il ne pourrait pas le vérifier.
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
