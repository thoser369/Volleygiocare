import { Component, OnInit, ViewChild } from '@angular/core';
import {UtenteService} from '../../services/utente.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {Utente} from '../../model/utente.model';
import { IonInfiniteScroll } from '@ionic/angular';
import {AlertController, NavController} from '@ionic/angular';
import {Feedback} from '../../model/feedback.model';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
    private utente$: BehaviorSubject<Utente>;
    private feedback$: Observable<Feedback[]>;
    private media; media1; media2; media3; media4; media5; numero_recensioni;

  constructor( private utenteService: UtenteService,
               private alertController: AlertController) { }

  ngOnInit() {
      this.feedback$ = this.utenteService.elencoCommenti();
      this.utente$ = this.utenteService.getUtente();
      this.utenteService.getMedia().subscribe(res => {
          const media = 'media';
          const media1 = 'media1';
          const media2 = 'media2';
          const media3 = 'media3';
          const media4 = 'media4';
          const media5 = 'media5';
          this.media = res[media];
          this.media1 = res[media1] / 10;
          this.media2 = res[media2] / 10;
          this.media3 = res[media3] / 10;
          this.media4 = res[media4] / 10;
          this.media5 = res[media5] / 10;
          this.numero_recensioni = res[media1] + res[media2] + res[media3] + res[media4] + res[media5];
      });
  }
    loadData(event) {
        setTimeout(() => {
            event.target.complete();
        }, 500);
    }
    async update() {

        const alert = await this.alertController.create({
                message: 'Modifica Descrizione',
                inputs: [{
                    name: 'descrizione',
                    placeholder: 'Modifica descrizione'
                }
                ],
                buttons: [
                    {
                        text: 'Annulla',
                        role: 'cancel'
                    },
                    {
                        text: 'Salva',
                        handler: data => {
                            this.utenteService.aggiungiDescrizione(data['descrizione']).subscribe(res => {
                                this.utente$.getValue().descrizione = res.body['data'];
                            });
                        }
                    }
                ]
            }
        );
        await alert.present();
    }

}
