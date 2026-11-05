import type { Classement } from "./classement";
import { Jeu } from "./jeu";

export class MatchEnUnSet {
  private jeuEnCours: Jeu;

  constructor(
    private joueur1: string,
    private joueur2: string,
    private classement: Classement,
  ) {
    this.jeuEnCours = new Jeu(joueur1, joueur2, { enregistrer: () => {} });
  }

  pointPour(joueur: string): void {
    this.jeuEnCours.pointPour(joueur);
  }

  score(): string {
    return this.jeuEnCours.score();
  }
}
