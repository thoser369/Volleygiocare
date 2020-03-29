import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GiocatoriPage } from './giocatori.page';

const routes: Routes = [
    {
        path: '',
        component: GiocatoriPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GiocatoriPageRoutingModule {}
