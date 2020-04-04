import { Component, OnInit } from '@angular/core';
import {Partita} from '../../model/partita.model';
import {Observable} from 'rxjs';
import {PartitaService} from '../../services/partita.service';


@Component({
  selector: 'app-my-matches',
  templateUrl: './mie-partite.page.html',
  styleUrls: ['./mie-partite.page.scss'],
})
export class MiePartitePage implements OnInit {

    private miepartite$: Observable<Partita[]>;
    private terminate$: Observable<Partita[]>;

  constructor(
      private partitaService: PartitaService, ) { }

    ionViewWillEnter() {
        this.miepartite$ = this.partitaService.miePartite();
        this.terminate$ = this.partitaService.terminate();
    }

  ngOnInit() {
  }
}
