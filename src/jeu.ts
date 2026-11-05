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
    // À 0-0, l'énoncé annonce "Zéro-Zéro" et non "Zéro-A"
    if (this.points1 === this.points2 && this.points1 > 0) {
      return `${ANNONCES[this.points1]}-A`;
    }
    return `${ANNONCES[this.points1]}-${ANNONCES[this.points2]}`;
  }
}
