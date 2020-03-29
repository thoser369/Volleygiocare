import { Component, OnInit } from '@angular/core';
import {Partita} from '../../model/partita.model';
import {Observable} from 'rxjs';
import {MatchService} from '../../services/match.service';
import {NavController} from '@ionic/angular';


@Component({
  selector: 'app-my-matches',
  templateUrl: './my-matches.page.html',
  styleUrls: ['./my-matches.page.scss'],
})
export class MyMatchesPage implements OnInit {

    private miepartite$: Observable<Partita[]>;
    private terminate$: Observable<Partita[]>;

  constructor(
      private matchService: MatchService,
      private navController: NavController, ) { }

    ionViewWillEnter() {
        this.miepartite$ = this.matchService.miePartite();
        this.terminate$ = this.matchService.terminate();
    }

  ngOnInit() {
  }
}
