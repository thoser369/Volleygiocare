import {Utente} from './utente.model';
import {Partita} from './partita.model';

export class Feedback {

    id_giocatore_votante: Utente;
    id_giocatore_votato: Utente;
    id_partita: number;
    commento: string;
    voto: string;

}
