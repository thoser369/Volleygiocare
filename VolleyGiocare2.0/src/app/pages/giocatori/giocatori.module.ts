import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {GiocatoriPageRoutingModule} from './giocatori-routing.module';

import {GiocatoriPage} from './giocatori.page';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        GiocatoriPageRoutingModule,
        TranslateModule,
        ReactiveFormsModule
    ],
    declarations: [GiocatoriPage],

})
export class GiocatoriPageModule {
}
