import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-settings',
    templateUrl: './impostazioni.page.html',
    styleUrls: ['./impostazioni.page.scss'],
})
export class ImpostazioniPage implements OnInit {

  constructor(private translateService: TranslateService) {
  }

  ngOnInit() {
  }

  changeL(event) {
    console.log(event.detail.value);
    if (event.detail.value === 'it') {
      this.translateService.setDefaultLang('it');
      this.translateService.use('it');
    } else {
      this.translateService.setDefaultLang('en');
      this.translateService.use('en');
    }
  }
}
