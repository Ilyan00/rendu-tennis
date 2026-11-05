export class Jeu {
  constructor(
    private joueur1: string,
    private joueur2: string,
  ) {}

  pointPour(joueur: string): void {}

  score(): string {
    return "Zéro-Zéro";
  }
}
