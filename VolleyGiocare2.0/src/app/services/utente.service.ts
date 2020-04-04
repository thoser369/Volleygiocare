import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

import {AUTH_TOKEN, URL, UTENTE_STORAGE, X_AUTH} from '../constants';
import {Utente} from '../model/utente.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Feedback} from '../model/feedback.model';

export interface Account {
    email: string;
    password: string;
    fName: string;
    lName: string;
    phone: string;
    favourite_role: string;
}

export interface LoginAccount {
    email: string;
    password: string;
}

@Injectable({
    providedIn: 'root'
})
export class UtenteService {
    private authToken: string;
    private loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private utente$: BehaviorSubject<Utente> = new BehaviorSubject<Utente>({} as Utente);

    constructor(private http: HttpClient, private storage: Storage) {

        this.storage.get(AUTH_TOKEN).then((token) => {
            this.authToken = token;
            if (token !== null && token !== undefined && token !== '') {
                this.loggedIn$.next(true);

            }
        });
        this.storage.get(UTENTE_STORAGE).then((utente) => {
            this.utente$.next(utente);
        });

    }




    login(loginAccount: LoginAccount): Observable<Utente> {
        return this.http.post<Utente>(URL.LOGIN, loginAccount, {observe: 'response'}).pipe(
            map((resp: HttpResponse<Utente>) => {
                const token = resp.headers.get(X_AUTH);
                console.log(token);
                this.storage.set(AUTH_TOKEN, token);
                this.authToken = token;
                // Utente memorizzato nello storage in modo tale che se si vuole cambiare il
                // profilo dell'utente stesso non si fa una chiamata REST.
                this.storage.set(UTENTE_STORAGE, resp.body);
                // update dell'observable dell'utente
                this.utente$.next(resp.body);
                this.loggedIn$.next(true);
                return resp.body;

            }));
    }

    logout() {
        // return this.http.get(URL.LOGOUT).subscribe(res => {
        // console.log(res);
        //   });
        this.authToken = null;
        this.loggedIn$.next(false);
        this.storage.remove(AUTH_TOKEN);
        this.storage.remove(UTENTE_STORAGE);


        // Nessuna chiamata al server perche' JWT e' stateless quindi non prevede alcun logout.
        // Per gestirlo si dovrebbe fare lato server una blacklist.
    }

    getUtente(): BehaviorSubject<Utente> {
        return this.utente$;
    }

    getAuthToken(): string {
        return this.authToken;
    }

    isLogged(): Observable<boolean> {
        return this.loggedIn$.asObservable();
    }


    Registrazione(account: Account) {
        const params = new HttpParams()
            .set('email', account.email)
            .set('password', account.password)
            .set('fName', account.fName)
            .set('lName', account.lName)
            .set('phone', account.phone)
            .set('favourite_role', account.favourite_role.toString());

      /*  console.log(params.get('fName'));
        console.log(params.get('lName'));
        console.log(params.get('email'));
        console.log(params.get('password'));
        console.log(params.get('phone'));
        console.log(params.get('favourite_role'));*/

        // const signUpUrl = `${URL.SIGNUP}/?${params}`;
        return this.http.post<Utente>(URL.REGISTRAZIONE, params, {observe: 'response'}).pipe(
            map((resp: HttpResponse<Utente>) => {
                // console.log(resp);


            }));
    }

    aggiungiDescrizione(descrizione) {
        const params = new HttpParams()
            .set('descrizione', descrizione);

        return this.http.post<Utente>(URL.AGGIUNGIDESCRIZIONE, params, {observe: 'response'});
    }

    elencoCommenti(): Observable<Feedback[]> {
        return this.http.get<Feedback[]>(URL.ELENCOCOMMENTI);

    }

    getMedia() {
        return this.http.get(URL.MEDIA);
    }
    numero_partite_giocate() {
        return this.http.get(URL.NUMERO_PARTITE_GIOCATE);
    }
}
