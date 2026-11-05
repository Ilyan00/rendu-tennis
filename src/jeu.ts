import type { Classement } from "./classement";

const ANNONCES = ["Zéro", "Quinze", "Trente", "Quarante"];
const QUARANTE = 3;
const POINTS_POUR_GAGNER = 4;

export class Jeu {
  private points1 = 0;
  private points2 = 0;

  constructor(
    private joueur1: string,
    private joueur2: string,
    private classement: Classement,
  ) {}

  pointPour(joueur: string): void {
    if (this.vainqueur()) {
      return;
    }

    if (joueur === this.joueur1) {
      this.points1++;
    } else {
      this.points2++;
    }

    const vainqueur = this.vainqueur();
    if (vainqueur) {
      const perdant = vainqueur === this.joueur1 ? this.joueur2 : this.joueur1;
      this.classement.enregistrer(vainqueur, perdant);
    }
  }

  score(): string {
    const vainqueur = this.vainqueur();
    if (vainqueur) {
      return `Victoire ${vainqueur}`;
    }
    if (this.points1 === this.points2 && this.points1 === QUARANTE) {
      return "Égalité";
    }
    if (this.points1 === this.points2 && this.points1 > 0) {
      return `${ANNONCES[this.points1]}-A`;
    }
    return `${ANNONCES[this.points1]}-${ANNONCES[this.points2]}`;
  }

  private vainqueur(): string | null {
    if (this.points1 === POINTS_POUR_GAGNER) return this.joueur1;
    if (this.points2 === POINTS_POUR_GAGNER) return this.joueur2;
    return null;
  }
}
