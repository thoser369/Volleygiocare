import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Injectable, OnInit} from '@angular/core';
import {URL} from '../constants';
import {Observable} from 'rxjs';
import {Partita} from '../model/partita.model';
import {Utente} from '../model/utente.model';
import {UtenteService} from './utente.service';
import {Feedback} from '../model/feedback.model';


@Injectable({
    providedIn: 'root'
})

export class PartitaService {

    constructor(private http: HttpClient, private utenteService: UtenteService) {
    }

    miePartite(): Observable<Partita[]> {
        return this.http.get<Partita[]>(URL.MIEPARTITE);
    }
    terminate(): Observable<Partita[]> {
        return this.http.get<Partita[]>(URL.PARTITETERMINATE);
    }


    listapartite(idUtente): Observable<Partita[]> {
        const apiUt = `${URL.PARTITE}/${idUtente}`;
        return this.http.get<Partita[]>(apiUt);
    }

    cerca_tramite_id(id): Observable<Partita> {
        const apiURL = `${URL.DETTAGLI}/${id}`;
        return this.http.get<Partita>(apiURL);
    }


    create(nuovapartita: Partita) {
        return this.http.post<Partita>(URL.NUOVAPARTITA, nuovapartita);
    }


    aggiungi_organizzatore() {
        return this.http.get<Partita>(URL.AGGIUNGI_ORGANIZZATORE);
    }

    partecipa(idGiocatore, idPartita) {
        const apiPart = `${URL.PARTECIPAZIONE}/${idGiocatore}/${idPartita}`;
        return this.http.get<Partita>(apiPart);

    }
    cercaGiocatori(partitaID: number): Observable<Utente[]> {
        const apiURL = `${URL.FEEDBACKPARTITA}/${partitaID}`;
        return this.http.get<Utente[]>(apiURL);
    }
    inviafeedback(feedback: Feedback) {
        const params = new HttpParams()
            .set('id_giocatore_votato', feedback.id_giocatore_votato.toString())
            .set('id_partita', feedback.id_partita.toString())
            .set('voto', feedback.voto)
            .set('commento', feedback.commento);
        return this.http.post<Utente>(URL.INVIAFEEDBACK, params, {observe: 'response'});
    }
    getFeedback(idpartita, idgiocatore) {
        const getfeedbackurl = `${URL.GETFEEDBACK}/${idpartita}/${idgiocatore}`;
        return this.http.get(getfeedbackurl);
    }
    rimuoviPartecipante(id_partita: number) {
        const apiURL = `${URL.RIMUOVIPARTECIPANTE}/${id_partita}`;
        return this.http.delete(apiURL);
    }
    eliminapartita(id_partita: number) {
        const apiURL = `${URL.ELIMINAPARTITA}/${id_partita}`;
        return this.http.delete(apiURL);
    }
}
