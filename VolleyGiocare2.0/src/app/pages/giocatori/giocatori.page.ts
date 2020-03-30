import {Component, OnInit} from '@angular/core';
import {Utente} from '../../model/utente.model';
import {Observable} from 'rxjs';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {MatchService} from '../../services/match.service';
import {UtenteService} from '../../services/utente.service';
import {AlertController, ModalController} from '@ionic/angular';
import {Feedback} from '../../model/feedback.model';

@Component({
    selector: 'app-giocatori',
    templateUrl: './giocatori.page.html',
    styleUrls: ['./giocatori.page.scss'],
})
export class GiocatoriPage implements OnInit {
    private id_partita: number;
    private giocatori$: Observable<Utente[]>;
    private votopresente: number;

    constructor(private activatedRoute: ActivatedRoute,
                private utenteService: UtenteService,
                private partitaService: MatchService,
                private modalController: ModalController,
                private alertController: AlertController,
                private alertController_commento: AlertController,
                private alertController_giocatore_votato: AlertController,
                private alertController_feedback_lasciato: AlertController) {
    }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
            this.giocatori$ = this.partitaService.findGiocatori(parseInt(params.get('id'), 0));
            // tslint:disable-next-line:radix
            this.id_partita = parseInt(params.get('id'));
        });
    }

     apriVotazione(giocatore: Utente) {
        this.partitaService.getFeedback(this.id_partita, giocatore.id).subscribe(res => {
        const check = 'check';
        this.votopresente = res[check];
        this.votazione(giocatore.id);
        });
    }
    async feedback_lasciato() {
        const alert_feedbacklasciato = await this.alertController_feedback_lasciato.create({
            message: 'Giocatore votato!',
            buttons: [{
                text: 'Ok'
            }]
        });
        await alert_feedbacklasciato.present();
    }
    async giocatore_gia_votato() {
        const alert_giocatore_votato = await this.alertController_giocatore_votato.create({
            message: 'Hai gia votato questo giocatore!',
            buttons: [{
                text: 'Ok'
            }]
        });
        await alert_giocatore_votato.present();
    }
    async votazione(idgiocatore) {
        if (this.votopresente <= 0) {
        const alert = await this.alertController.create({
                message: 'Esprimi un voto da 1 a 5',
                inputs: [{
                    name: 'votazione1',
                    type: 'radio',
                    label: '1',
                    value: '1',
                },
                    {
                        name: 'votazione2',
                        type: 'radio',
                        label: '2',
                        value: '2',
                    },
                    {
                        name: 'votazione3',
                        type: 'radio',
                        label: '3',
                        value: '3',
                    },
                    {
                        name: 'votazione4',
                        type: 'radio',
                        label: '4',
                        value: '4',
                    },
                    {
                        name: 'votazione5',
                        type: 'radio',
                        label: '5',
                        value: '5',
                    }
                ],
                buttons: [
                    {
                        text: 'Annulla',
                        role: 'cancel'
                    },
                    {
                        text: 'Invia voto',
                        handler: async data => {
                            const alert_commento = await this.alertController_commento.create({
                                message: 'Scrivi un commento',
                                inputs: [{
                                    name: 'commento',
                                    placeholder: 'Inserisci un commento (facoltativo)'
                                }],
                                buttons: [
                                    {
                                        text: 'Annulla',
                                        role: 'cancel'
                                    },
                                    {
                                        text: 'Invia commento',
                                        handler: data_commento => {
                                            const feedback = new Feedback();
                                            feedback.voto = data;
                                            feedback.commento = data_commento['commento'];
                                            feedback.id_partita = this.id_partita;
                                            feedback.id_giocatore_votato = idgiocatore;
                                            this.partitaService.inviafeedback(feedback).subscribe(res => {
                                            });
                                            this.feedback_lasciato();
                                        }
                                    }
                                ]
                            });
                            await alert_commento.present();
                        }
                    }
                ]
            }
        );
        await alert.present();
        } else { this.giocatore_gia_votato(); }
    }
}
