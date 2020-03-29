import {Utente} from './utente.model';
import {Partita} from './partita.model';

export class Feedback {

    id_giocatore_votante: bigint;
    id_giocatore_votato: bigint;
    id_partita: number;
    commento: string;
    voto: string;

}
