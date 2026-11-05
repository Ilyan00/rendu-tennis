import type { Classement } from "./classement";
import { Jeu } from "./jeu";

const JEUX_POUR_GAGNER = 4;

export class MatchEnUnSet {
  private jeuEnCours: Jeu;
  private jeux1 = 0;
  private jeux2 = 0;

  constructor(
    private joueur1: string,
    private joueur2: string,
    private classement: Classement,
  ) {
    this.jeuEnCours = this.nouveauJeu();
  }
  private jeuGagnePar(vainqueur: string): void {
    if (vainqueur === this.joueur1) {
      this.jeux1++;
    } else {
      this.jeux2++;
    }
    this.jeuEnCours = this.nouveauJeu();
  }

  private nouveauJeu(): Jeu {
    return new Jeu(this.joueur1, this.joueur2, {
      enregistrer: (vainqueur) => this.jeuGagnePar(vainqueur),
    });
  }

  pointPour(joueur: string): void {
    this.jeuEnCours.pointPour(joueur);
  }

  score(): string {
    const vainqueur = this.vainqueur();
    if (vainqueur) {
      const perdant = vainqueur === this.joueur1 ? this.joueur2 : this.joueur1;
      return `Victoire ${vainqueur} ${this.jeuxGagnes(vainqueur)}-${this.jeuxGagnes(perdant)}`;
    }
    return this.jeuEnCours.score();
  }

  private vainqueur(): string | null {
    if (this.jeux1 === JEUX_POUR_GAGNER) return this.joueur1;
    if (this.jeux2 === JEUX_POUR_GAGNER) return this.joueur2;
    return null;
  }

  jeuxGagnes(joueur: string): number {
    return joueur === this.joueur1 ? this.jeux1 : this.jeux2;
  }
}
