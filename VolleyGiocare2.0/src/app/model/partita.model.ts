import {Utente} from './utente.model';

export class Partita {
    id: number;
    titolo: string;
    descrizione: string;
    // tslint:disable-next-line:variable-name
    data_ora: Date;
    ora: Date;
    luogo: string;
    // tslint:disable-next-line:variable-name
    numero_giocatori: number;
    tipo: string;
    organizzatore: Utente;




}
