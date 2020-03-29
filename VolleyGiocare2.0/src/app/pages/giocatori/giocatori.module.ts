import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {GiocatoriPageRoutingModule} from './giocatori-routing.module';

import {GiocatoriPage} from './giocatori.page';
import {TranslateModule} from '@ngx-translate/core';
import {FeedbackPageModule} from '../feedback/feedback.module';
import {FeedbackPage} from '../feedback/feedback.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        GiocatoriPageRoutingModule,
        TranslateModule,
        ReactiveFormsModule
    ],
    declarations: [GiocatoriPage, FeedbackPage],
    entryComponents: [FeedbackPage]
})
export class GiocatoriPageModule {
}
