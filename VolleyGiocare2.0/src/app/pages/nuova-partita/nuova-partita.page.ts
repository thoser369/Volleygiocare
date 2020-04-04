import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatchService, NewMatch} from '../../services/match.service';
import {NavController} from '@ionic/angular';
import {Utente} from '../../model/utente.model';
import {UtenteService} from '../../services/utente.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-new-match',
    templateUrl: './nuova-partita.page.html',
    styleUrls: ['./nuova-partita.page.scss'],
})
export class NuovaPartitaPage implements OnInit {
    datap: Date = new Date();
    orap: Date = new Date();
    private user = new Utente();
    private newMatchFormModel: FormGroup;
    private user$: Observable<Utente>;

    constructor(private formBuilder: FormBuilder,
                private matchService: MatchService,
                private navController: NavController,
                private utenteService: UtenteService,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.utenteService.getUtente().subscribe(res => {
            this.user = res;
           // console.log(this.user.id);
        });

        this.newMatchFormModel = this.formBuilder.group({
            titolo: ['', Validators.compose([
                Validators.required
            ])],
            luogo: ['', Validators.compose([
                Validators.required
            ])],
            descrizione: ['', Validators.compose([
                Validators.required
            ])],
            data_ora: ['', Validators.compose([
                Validators.required
            ])],
            ora: ['', Validators.compose([
                Validators.required
            ])],
            tipo: ['Volley', Validators.compose([
                Validators.required
            ])],
            numero_giocatori: ['', Validators.compose([
                Validators.required
            ])],
            org: ''
        });
    }

    cambio(event) {
       // console.log('ionChange', event);
        const d = new Date(event.detail.value);
       // console.log(d.toDateString());
    }

    cambioo(event) {
        const ora = event.detail.value;
      //  console.log(ora);
    }

    changeL(event) {
      //  console.log(event.detail.value);
    }

    onCreateNew() {
       // console.log(this.user.id);
        this.newMatchFormModel.patchValue({org: this.user.id});
        const nm: NewMatch = this.newMatchFormModel.value;
        this.matchService.create(nm).subscribe(() => {
            this.newMatchFormModel.reset();
            this.navController.navigateRoot('/tabs/home').then((result) => {
                this.matchService.aggiungi().subscribe(res => {
                   // console.log(res);
                });
            });
        });




    }


}
