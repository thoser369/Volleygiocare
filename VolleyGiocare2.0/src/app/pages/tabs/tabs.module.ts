import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';

import {TabsPage} from './tabs.page';
import {TranslateModule} from '@ngx-translate/core';

const routes: Routes = [
    {
        path: '',
        component: TabsPage,
        children: [
            {
                path: 'home',
                children: [
                    {
                        path: '',
                        loadChildren: '../home/home.module#HomePageModule'
                    }
                    ,
                ]
            },


            {
                path: 'profilo',
                children: [
                    {
                        path: '',
                        loadChildren: '../profilo/profilo.module#ProfiloPageModule'
                    }
                ]
            },
            {
                path: 'mie-partite',
                children: [
                    {
                        path: '',
                        loadChildren: '../mie-partite/mie-partite.module#MiePartitePageModule'
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/tabs/home',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TranslateModule.forChild(),
        RouterModule.forChild(routes)
    ],
    declarations: [TabsPage]
})
export class TabsPageModule {
}
