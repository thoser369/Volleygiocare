import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './guard/auth.guard';

const routes: Routes = [
    {path: '', redirectTo: 'sscreen', pathMatch: 'full'},
    {path: 'login', loadChildren: './pages/login/login.module#LoginPageModule'},
    {path: 'registration', loadChildren: './pages/registration/registration.module#RegistrationPageModule'},
    {path: 'giocatori/:id', loadChildren: () => import('./pages/giocatori/giocatori.module').then(r => r.GiocatoriPageModule), canActivate: [AuthGuard]},
    {path: 'new-match', loadChildren: './pages/new-match/new-match.module#NewMatchPageModule'},
    {path: 'details/:id', loadChildren: './pages/details/details.module#DetailsPageModule'},
    {path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule'}, // , canActivateChild: [AuthGuard]
    {path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule'},
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
