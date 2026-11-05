import type { Classement } from "./classement";
import { Jeu } from "./jeu";

export class MatchEnUnSet {
  private jeuEnCours: Jeu;
  private jeux1 = 0;
  private jeux2 = 0;

  constructor(
    private joueur1: string,
    private joueur2: string,
    private classement: Classement,
  ) {
    this.jeuEnCours = new Jeu(joueur1, joueur2, {
      enregistrer: (vainqueur) => this.jeuGagnePar(vainqueur),
    });
  }

  pointPour(joueur: string): void {
    this.jeuEnCours.pointPour(joueur);
  }

  score(): string {
    return this.jeuEnCours.score();
  }

  jeuxGagnes(joueur: string): number {
    return joueur === this.joueur1 ? this.jeux1 : this.jeux2;
  }

  private jeuGagnePar(vainqueur: string): void {
    if (vainqueur === this.joueur1) {
      this.jeux1++;
    } else {
      this.jeux2++;
    }
  }
}
