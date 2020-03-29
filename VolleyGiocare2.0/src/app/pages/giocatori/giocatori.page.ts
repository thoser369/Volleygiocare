import {Component, OnInit} from '@angular/core';
import {Utente} from '../../model/utente.model';
import {Observable} from 'rxjs';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {MatchService} from '../../services/match.service';
import {UtenteService} from '../../services/utente.service';
import {AlertController, ModalController} from '@ionic/angular';
import {FeedbackPage} from '../feedback/feedback.page';
import {Partita} from '../../model/partita.model';
import {Feedback} from '../../model/feedback.model';

@Component({
    selector: 'app-giocatori',
    templateUrl: './giocatori.page.html',
    styleUrls: ['./giocatori.page.scss'],
})
export class GiocatoriPage implements OnInit {
    private id_partita: number;
    private giocatori$: Observable<Utente[]>;

    constructor(private activatedRoute: ActivatedRoute,
                private utenteService: UtenteService,
                private partitaService: MatchService,
                private modalController: ModalController,
                private alertController: AlertController) {
    }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
            this.giocatori$ = this.partitaService.findGiocatori(parseInt(params.get('id'), 0));
            // tslint:disable-next-line:radix
            this.id_partita = parseInt(params.get('id'));
        });
    }

    async apriVotazione(giocatore: Utente) {
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
                        handler: data => {
                            const feedback = new Feedback();
                            feedback.voto = data;
                            feedback.id_partita = this.id_partita;
                            feedback.id_giocatore_votato = giocatore.id;
                            this.partitaService.inviafeedback(feedback).subscribe(res => {
                            });
                        }
                    }
                ]
            }
        );
        await alert.present();
    }
}
