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
    return `${ANNONCES[this.points1]}-${ANNONCES[this.points2]}`;
  }
}
