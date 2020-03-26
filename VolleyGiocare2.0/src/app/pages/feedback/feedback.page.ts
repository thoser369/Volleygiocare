import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AlertController, ModalController, NavParams} from '@ionic/angular';
import {Utente} from '../../model/utente.model';
import {UtenteService} from '../../services/utente.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {MatchService} from '../../services/match.service';
import {Partita} from '../../model/partita.model';
import {Observable} from 'rxjs';
import {Feedback} from '../../model/feedback.model';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  private votazioneFormModel: FormGroup;
  private color: any = {color1: '', color2: '', color3: '', color4: '', color5: ''};
  private numeroStelle: number;
  private giocatore: Utente;
  private partita: Partita;
  private giaVotato;
  private feedback;

  constructor(private formBuilder: FormBuilder,
              private modalController: ModalController,
              private activatedRoute: ActivatedRoute,
              private utenteService: UtenteService,
              private navParams: NavParams,
              private partitaService: MatchService,
              private alertController: AlertController) {

  }

  ngOnInit() {

    this.votazioneFormModel = this.formBuilder.group({
      commento: new FormControl(),
      voto: new FormControl()
    });

    this.giocatore = this.navParams.data.appParam;
    this.partita = this.navParams.data.partitaParam;

    this.partitaService.checkFeedback(this.partita, this.giocatore).subscribe(res => {
      const feedback = 'feedback';
      const check = 'check';
      this.feedback = res[feedback][0];
      this.giaVotato = res[check];

    });


  }

  async chiudiModal() {
    await this.modalController.dismiss();
  }

  starUno(event) {
    this.color.color1 = 'primary';
    this.color.color2 = '';
    this.color.color3 = '';
    this.color.color4 = '';
    this.color.color5 = '';
    this.numeroStelle = 1;
    this.votazioneFormModel.patchValue({voto: this.numeroStelle});
  }

  starDue(event) {
    this.color.color1 = 'primary';
    this.color.color2 = 'primary';
    this.color.color3 = '';
    this.color.color4 = '';
    this.color.color5 = '';
    this.numeroStelle = 2;
    this.votazioneFormModel.patchValue({voto: this.numeroStelle});
  }

  starTre(event) {
    this.color.color1 = 'primary';
    this.color.color2 = 'primary';
    this.color.color3 = 'primary';
    this.color.color4 = '';
    this.color.color5 = '';
    this.numeroStelle = 3;
    this.votazioneFormModel.patchValue({voto: this.numeroStelle});
  }

  starQuattro(event) {
    this.color.color1 = 'primary';
    this.color.color2 = 'primary';
    this.color.color3 = 'primary';
    this.color.color4 = 'primary';
    this.color.color5 = '';
    this.numeroStelle = 4;
    this.votazioneFormModel.patchValue({voto: this.numeroStelle});
  }

  starCinque(event) {
    this.color.color1 = 'primary';
    this.color.color2 = 'primary';
    this.color.color3 = 'primary';
    this.color.color4 = 'primary';
    this.color.color5 = 'primary';
    this.numeroStelle = 5;
    this.votazioneFormModel.patchValue({voto: this.numeroStelle});
  }

  reset() {
    this.color.color1 = '';
    this.color.color2 = '';
    this.color.color3 = '';
    this.color.color4 = '';
    this.color.color5 = '';

    this.votazioneFormModel.reset();
  }

  async vota() {
    const votazione: Feedback = this.votazioneFormModel.value;
    votazione.id_giocatore_votato = this.navParams.data.appParam;
    votazione.id_partita = this.navParams.data.partitaParam;

    this.partitaService.lasciaFeedback(votazione).subscribe();
    await this.modalController.dismiss();
    this.presentAlert();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      message: 'Feedback lasciato!',
      buttons: [{
        text: 'Ok',
        cssClass: 'primary'
      }]
    });
    await alert.present();
  }
}
