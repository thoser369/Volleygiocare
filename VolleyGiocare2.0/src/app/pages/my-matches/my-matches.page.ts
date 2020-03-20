import { Component, OnInit } from '@angular/core';
import {Partita} from '../../model/partita.model';
import {Observable} from 'rxjs';
import {MatchService} from '../../services/match.service';


@Component({
  selector: 'app-my-matches',
  templateUrl: './my-matches.page.html',
  styleUrls: ['./my-matches.page.scss'],
})
export class MyMatchesPage implements OnInit {

    private miepartite$: Observable<Partita[]>;

  constructor(
      private matchService: MatchService) { }

    ionViewWillEnter() {
        this.miepartite$ = this.matchService.miePartite();
    }

  ngOnInit() {
  }

}
