import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {Observable} from 'rxjs';
import {Partita} from '../../model/partita.model';
import {PartitaService} from '../../services/partita.service';
import {Utente} from '../../model/utente.model';
import {UtenteService} from '../../services/utente.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
    private partite$: Observable<Partita[]>;
    private utente = new Utente();
    private idUtente;

    constructor(private navController: NavController,
                private partitaService: PartitaService,
                private utenteService: UtenteService) {
    }

    ngOnInit() {


    }


    goToNew() {
        this.navController.navigateRoot('/nuova-partita');
    }

    reload(event) {
        this.partite$ = this.partitaService.listapartite(this.idUtente);
        setTimeout(() => {
            event.target.complete();
        }, 2000);
    }

    ionViewWillEnter() {
        this.utenteService.getUtente().subscribe(res => {
            this.utente = res;
            this.idUtente = res.id;
            // console.log(res);
        });

        this.partite$ = this.partitaService.listapartite(this.idUtente);
        this.partite$.subscribe(res1 => {
           // console.log(res1);
        });


       // console.log(this.idU);
    }
}
