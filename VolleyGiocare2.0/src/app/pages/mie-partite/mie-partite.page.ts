import { Component, OnInit } from '@angular/core';
import {Partita} from '../../model/partita.model';
import {Observable} from 'rxjs';
import {PartitaService} from '../../services/partita.service';
import {NavController} from '@ionic/angular';


@Component({
  selector: 'app-my-matches',
  templateUrl: './mie-partite.page.html',
  styleUrls: ['./mie-partite.page.scss'],
})
export class MiePartitePage implements OnInit {

    private miepartite$: Observable<Partita[]>;
    private terminate$: Observable<Partita[]>;

  constructor(
      private matchService: PartitaService,
      private navController: NavController, ) { }

    ionViewWillEnter() {
        this.miepartite$ = this.matchService.miePartite();
        this.terminate$ = this.matchService.terminate();
    }

  ngOnInit() {
  }
}
