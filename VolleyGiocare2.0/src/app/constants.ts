
export const LINGUA = 'lingua';

export const X_AUTH = 'token';

export const AUTH_TOKEN = 'auth-token';

export const UTENTE_STORAGE = 'utente';

export const USE_PROXY = true;

export const URL_BASE = USE_PROXY ? '/api' : 'http://127.0.0.1:8000';


export const URL = {
    REGISTRAZIONE: URL_BASE + '/auth/register',
    LOGIN: URL_BASE + '/auth/login', //
    PARTITE: URL_BASE + '/home', //
    DETTAGLI: URL_BASE + '/matchD', //
    NUOVAPARTITA : URL_BASE + '/newM',
    LOGOUT: URL_BASE + '/auth/logout',
    AGGIUNGI_ORGANIZZATORE: URL_BASE + '/partecipa', //
    PARTECIPAZIONE: URL_BASE + '/aggiunta', //
    MIEPARTITE: URL_BASE + '/mymatches', //
    PARTITETERMINATE: URL_BASE + '/terminated', //
    AGGIUNGIDESCRIZIONE: URL_BASE + '/updateDescription', //
    FEEDBACKPARTITA: URL_BASE + '/feedbackP', //
    INVIAFEEDBACK: URL_BASE + '/inviafeedback', //
    GETFEEDBACK: URL_BASE + '/getfeedback', //
    ELENCOCOMMENTI: URL_BASE + '/getcommenti', //
    MEDIA: URL_BASE + '/getmedia', //
    NUMERO_PARTITE_GIOCATE: URL_BASE + '/getnumeropartite', //

};
