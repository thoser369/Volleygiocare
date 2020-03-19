import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Injectable, OnInit} from '@angular/core';
import {URL} from '../constants';
import {Observable} from 'rxjs';
import {Partita} from '../model/partita.model';
import {Utente} from '../model/utente.model';
import {map} from 'rxjs/operators';
import {UtenteService} from './utente.service';


export interface NewMatch {
    titolo: string;
    luogo: string;
    numero_giocatori: string;
    descrizione: string;
    data_ora: Date;
    ora: Date;
    tipo: string;
    org: Utente;
}


@Injectable({
    providedIn: 'root'
})

export class MatchService {
    private user = new Utente();
    private idU = this.user.id;

    constructor(private http: HttpClient, private utenteService: UtenteService) {
    }

    miePartite(): Observable<Partita[]> {
        return this.http.get<Partita[]>(URL.MIEPARTITE);
    }


    list(idU): Observable<Partita[]> {
        const apiUt = `${URL.MATCHES}/${idU}`;
        return this.http.get<Partita[]>(apiUt);
    }

    findById(id): Observable<Partita> {
        const apiURL = `${URL.MATCH_DETAIL}/${id}`;
        return this.http.get<Partita>(apiURL);
    }


    create(nm: NewMatch) {
        const p = new Date(nm.data_ora);
        const o = new Date(nm.ora);

        const params = new HttpParams()
            // .set('org', nm.org)
            .set('titolo', nm.titolo)
            .set('luogo', nm.luogo)
            .set('numero_giocatori', nm.numero_giocatori)
            .set('descrizione', nm.descrizione)
            .set('data_ora', p.toDateString())
            .set('ora', o.toTimeString())
            .set('tipo', nm.tipo)
            .set('organizzatore', String(nm.org));
        console.log(params);


        // const signUpUrl = `${URL.SIGNUP}/?${params}`;
        return this.http.post<Partita>(URL.NM, nm, {observe: 'response'}).pipe(
            map((resp: HttpResponse<Partita>) => {
                console.log(resp);
            }));
    }


    aggiungi() {
        return this.http.get<Partita>(URL.PARTECIPA);
    }

    clicca(idG, idP) {
        const apiPart = `${URL.PARTECIPAZIONE}/${idG}/${idP}`;
        return this.http.get<Partita>(apiPart);
        console.log('chiamata');

    }

}
