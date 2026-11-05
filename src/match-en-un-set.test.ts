import { describe, it, expect, vi } from "vitest";
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

  it("un nouveau jeu commence après chaque jeu gagné", () => {
    const match = new MatchEnUnSet("Alice", "Bob", classementInutile);

    gagnerUnJeu(match, "Alice");
    match.pointPour("Bob");

    expect(match.score()).toBe("Zéro-Quinze");
  });

  it("le premier à 4 jeux gagne le match", () => {
    const match = new MatchEnUnSet("Alice", "Bob", classementInutile);

    for (let i = 0; i < 4; i++) {
      gagnerUnJeu(match, "Alice");
    }

    expect(match.score()).toBe("Victoire Alice 4-0");
  });

  it("annonce la victoire avec les jeux du vainqueur en premier", () => {
    const match = new MatchEnUnSet("Alice", "Bob", classementInutile);

    gagnerUnJeu(match, "Alice");
    for (let i = 0; i < 4; i++) {
      gagnerUnJeu(match, "Bob");
    }

    expect(match.score()).toBe("Victoire Bob 4-1");
  });

  // Spy : je veux vérifier que le classement reçoit le résultat du match une seule fois, et pas celui de chaque jeu. Un stub ne retient pas ses appels.
  it("enregistre le résultat du match, pas celui de chaque jeu", () => {
    const classement = { enregistrer: vi.fn() };
    const match = new MatchEnUnSet("Alice", "Bob", classement);

    gagnerUnJeu(match, "Bob");
    for (let i = 0; i < 4; i++) {
      gagnerUnJeu(match, "Alice");
    }

    expect(classement.enregistrer).toHaveBeenCalledOnce();
    expect(classement.enregistrer).toHaveBeenCalledWith("Alice", "Bob");
  });
});
