import { Component, OnInit, ViewChild } from '@angular/core';
import {UtenteService} from '../../services/utente.service';
import {BehaviorSubject} from 'rxjs';
import {Utente} from '../../model/utente.model';
import { IonInfiniteScroll } from '@ionic/angular';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  // @ts-ignore
 @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  private u1 = new Utente();
  private index = 0;
  public lenght = 0;
  private i; uno = 0; due = 0; tre = 0; quattro = 0; cinque = 0;
  private voti: Array<number> = [3, 5, 5, 3, 4, 5, 5, 5, 5, 4, 2, 2, 2, 1, 1];
  private numero: string;
  private data: Array<string> = ['ciao', 'a', 'b', 'c', 'd', 'e'];

  constructor( private utenteService: UtenteService) { }

  ngOnInit() {
    for (this.i = 0; this.i < this.voti.length; this.i++) {
      this.index = this.index + this.voti[this.i];
      if (this.voti[this.i] === 1) { this.uno++; }
      if (this.voti[this.i] === 2) { this.due++; }
      if (this.voti[this.i] === 3) { this.tre++; }
      if (this.voti[this.i] === 4) { this.quattro++; }
      if (this.voti[this.i] === 5) { this.cinque++; }
    }
    this.uno = this.uno / 10;
    this.due = this.due / 10;
    this.tre = this.tre / 10;
    this.quattro = this.quattro / 10;
    this.cinque = this.cinque / 10;
    this.numero = (this.index / this.i).toFixed(1);
    this.index = this.index / this.i;


    this.utenteService.getUtente().subscribe(res => {
      console.log(res.nome);
      this.u1.nome = res.nome;
      this.u1.cognome = res.cognome;
      this.u1.ruolo = res.ruolo;
      this.u1 = res;
     });
  }
  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.data.length === 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
}
