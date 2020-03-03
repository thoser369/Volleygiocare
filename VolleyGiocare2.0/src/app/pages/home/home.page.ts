import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {Observable} from 'rxjs';
import {Partita} from '../../model/partita.model';
import {MatchService} from '../../services/match.service';
import {Utente} from '../../model/utente.model';
import {UtenteService} from '../../services/utente.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
    private matches$: Observable<Partita[]>;
    private user = new Utente();
    private idU;

    constructor(private navController: NavController,
                private matchService: MatchService,
                private utenteService: UtenteService) {
    }

    ngOnInit() {


    }


    goToNew() {
        this.navController.navigateRoot('/new-match');
    }

    reload(event) {
        this.matches$ = this.matchService.list(this.idU);
        setTimeout(() => {
            event.target.complete();
        }, 2000);
    }

    ionViewWillEnter() {
        this.utenteService.getUtente().subscribe(res => {
            this.user = res;
            this.idU = res.id;
            //console.log(res);
        });

        this.matches$ = this.matchService.list(this.idU);
        this.matches$.subscribe(res1 => {
           // console.log(res1);
        });


       // console.log(this.idU);
    }
}
