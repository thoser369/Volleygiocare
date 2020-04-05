import {Component, OnInit} from '@angular/core';
import {Partita} from '../../model/partita.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {PartitaService} from '../../services/partita.service';
import {Utente} from '../../model/utente.model';
import {UtenteService} from '../../services/utente.service';


@Component({
    selector: 'app-my-matches',
    templateUrl: './mie-partite.page.html',
    styleUrls: ['./mie-partite.page.scss'],
})
export class MiePartitePage implements OnInit {

    private utente$: BehaviorSubject<Utente>;
    private miepartite$: Observable<Partita[]>;
    private terminate$: Observable<Partita[]>;

    constructor(
        private utenteService: UtenteService,
        private partitaService: PartitaService,) {
    }

    ionViewWillEnter() {
        this.utente$ = this.utenteService.getUtente();
        this.miepartite$ = this.partitaService.miePartite();
        this.terminate$ = this.partitaService.terminate();
    }

    ngOnInit() {
    }

    rimuoviPartecipante(partita: Partita) {
        this.partitaService.rimuoviPartecipante(partita.id).subscribe();
        this.miepartite$ = this.partitaService.miePartite();
    }

    eliminapartita(partita: Partita) {
        this.partitaService.eliminapartita(partita.id).subscribe();
        this.miepartite$ = this.partitaService.miePartite();
    }
}
