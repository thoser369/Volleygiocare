import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './guard/auth.guard';

const routes: Routes = [
    {path: '', redirectTo: 'sscreen', pathMatch: 'full'},
    {path: 'login', loadChildren: './pages/login/login.module#LoginPageModule'},
    {path: 'registrazione', loadChildren: './pages/registrazione/registrazione.module#RegistrazionePageModule'},
    {path: 'giocatori/:id', loadChildren: () => import('./pages/giocatori/giocatori.module').then(r => r.GiocatoriPageModule), canActivate: [AuthGuard]},
    {path: 'nuova-partita', loadChildren: './pages/nuova-partita/nuova-partita.module#NuovaPartitaPageModule'},
    {path: 'dettagli/:id', loadChildren: './pages/dettagli/dettagli.module#DettagliPageModule'},
    {path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule'}, // , canActivateChild: [AuthGuard]
    {path: 'impostazioni', loadChildren: './pages/impostazioni/impostazioni.module#ImpostazioniPageModule'},
    { path: 'sscreen', loadChildren: './pages/sscreen/sscreen.module#SscreenPageModule' },


];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
