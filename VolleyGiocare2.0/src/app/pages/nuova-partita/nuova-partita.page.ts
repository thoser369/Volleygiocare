import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PartitaService} from '../../services/partita.service';
import {NavController} from '@ionic/angular';
import {Utente} from '../../model/utente.model';
import {UtenteService} from '../../services/utente.service';
import {Partita} from '../../model/partita.model';

@Component({
    selector: 'app-new-match',
    templateUrl: './nuova-partita.page.html',
    styleUrls: ['./nuova-partita.page.scss'],
})
export class NuovaPartitaPage implements OnInit {
    private minDate = new Date().toISOString();
    private utente = new Utente();
    private nuovaPartitaFormModel: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private partitaService: PartitaService,
                private navController: NavController,
                private utenteService: UtenteService) {
    }

    ngOnInit() {
        this.utenteService.getUtente().subscribe(res => {
            this.utente = res;
           // console.log(this.user.id);
        });

        this.nuovaPartitaFormModel = this.formBuilder.group({
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
            tipo: ['Volley', Validators.compose([
                Validators.required
            ])],
            numero_giocatori: ['', Validators.compose([
                Validators.required
            ])],
            org: ''
        });
    }

    onCreateNew() {
       // console.log(this.user.id);
        this.nuovaPartitaFormModel.patchValue({org: this.utente.id});
        const nuova_partita: Partita = this.nuovaPartitaFormModel.value;
        this.partitaService.create(nuova_partita).subscribe(() => {
            this.nuovaPartitaFormModel.reset();
            this.navController.navigateRoot('/tabs/home').then((result) => {
                this.partitaService.aggiungi_organizzatore().subscribe(res => {
                   // console.log(res);
                });
            });
        });




    }


}
