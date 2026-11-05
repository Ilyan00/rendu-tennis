const ANNONCES = ["Zéro", "Quinze", "Trente", "Quarante"];

export class Jeu {
  private points1 = 0;
  private points2 = 0;

  constructor(
    private joueur1: string,
    private joueur2: string,
  ) {}

  pointPour(joueur: string): void {
    if (joueur === this.joueur1) {
      this.points1++;
    } else {
      this.points2++;
    }
  }

  score(): string {
    // VICTOIRE
    if (this.points1 === 4) {
      return `Victoire ${this.joueur1}`;
    }
    if (this.points2 === 4) {
      return `Victoire ${this.joueur2}`;
    }
    // MEME POINTS
    if (this.points1 === this.points2 && this.points1 === 3) {
      return "Égalité";
    }
    if (this.points1 === this.points2 && this.points1 > 0) {
      return `${ANNONCES[this.points1]}-A`;
    }

    //SCORE BASIQUE
    return `${ANNONCES[this.points1]}-${ANNONCES[this.points2]}`;
  }
}
