import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Partita} from '../../model/partita.model';
import {PartitaService} from '../../services/partita.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

import {UtenteService} from '../../services/utente.service';
import {NavController} from '@ionic/angular';


@Component({
    selector: 'app-details',
    templateUrl: './dettagli.page.html',
    styleUrls: ['./dettagli.page.scss'],
})
export class DettagliPage implements OnInit {
    private partita$: Observable<Partita>;
    private partita = new Partita();
    private idGiocatore;

    constructor(private partitaService: PartitaService,
                private activatedRoute: ActivatedRoute,
                private utenteService: UtenteService,
                private navController: NavController,
                private router: Router
    ) {
    }

    ngOnInit() {

        this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
            this.partita$ = this.partitaService.cerca_tramite_id(parseInt(params.get('id'), 0));
        });
        this.partita$.subscribe(res => {
            this.partita = res[0];
        });
    }

    onPartecipa() {
        this.utenteService.getUtente().subscribe(res1 => {
            this.idGiocatore = res1.id;
        });

        this.partitaService.partecipa(this.idGiocatore, this.partita.id).subscribe(res => {
            // console.log(res);
        });
        this.router.navigateByUrl('/tabs');
        // this.navController.navigateRoot('/tabs/home');


    }
}
