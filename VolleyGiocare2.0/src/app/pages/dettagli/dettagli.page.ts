import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Partita} from '../../model/partita.model';
import {MatchService} from '../../services/match.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

import {UtenteService} from '../../services/utente.service';
import {NavController} from '@ionic/angular';


@Component({
    selector: 'app-details',
    templateUrl: './dettagli.page.html',
    styleUrls: ['./dettagli.page.scss'],
})
export class DettagliPage implements OnInit {
    private match$: Observable<Partita>;
    private m = new Partita();
    private idG;
    private idP;
    private pa = new Partita();

    constructor(private matchService: MatchService,
                private activatedRoute: ActivatedRoute,
                private utenteService: UtenteService,
                private navController: NavController,
                private router: Router
    ) {
    }

    ngOnInit() {

        this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
            this.match$ = this.matchService.findById(parseInt(params.get('id'), 0));
          //  console.log(params);
        });

       // console.log(this.match$);

        this.match$.subscribe(res => {
            this.pa.id = res[0].id;
            console.log(this.pa.id);
            this.m = res[0];
            console.log(res);
            // console.log(res[0].titolo);
            // this.m.titolo = res[0].titolo;
            //  this.m = res[0];

        });
    }

    onPartecipa() {
        this.utenteService.getUtente().subscribe(res1 => {
            this.idG = res1.id;
        });

        this.idP = this.pa.id;
        this.matchService.clicca(this.idG, this.idP).subscribe(res => {
           // console.log(res);
        });
        this.router.navigateByUrl('/tabs');
       // this.navController.navigateRoot('/tabs/home');


    }
}
