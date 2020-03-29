import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertController, LoadingController, NavController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {LoginAccount, UtenteService} from '../../services/utente.service';
import {ActivatedRoute} from '@angular/router';
import {Utente} from '../../model/utente.model';
import {HttpErrorResponse} from '@angular/common/http';


@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    private loginFormModel: FormGroup;
    private loginTitle: string;
    private loginSubTitle: string;
    private loading;
    private utente = new Utente();


    constructor(private formBuilder: FormBuilder,
                private alertController: AlertController,
                private translateService: TranslateService,
                private navController: NavController,
                private route: ActivatedRoute,
                private utenteService: UtenteService,
                private loadingCtrl: LoadingController
    ) {
    }

    ngOnInit() {
        this.utenteService.getUtente().subscribe(res => {
            this.utente = res ;
        });
        this.loginFormModel = this.formBuilder.group({
            email: ['', Validators.compose([
                Validators.required, Validators.email
            ])],
            password: ['', Validators.compose([
                Validators.required
            ])]
        });
        this.initTranslate();
    }

    onLogin() {

        this.loadingCtrl.create({
            message: 'Autenticazione in corso...'
        }).then((overlay) => {
            this.loading = overlay;
            this.loading.present();
        });

        setTimeout(() => {
            this.loading.dismiss();
            // this.navController.navigateRoot('/tabs');
        }, 2000);

        const loginAccount: LoginAccount = this.loginFormModel.value;
        this.utenteService.login(loginAccount).subscribe(res => {
            console.log(res.name);
            this.loginFormModel.reset();
            this.utenteService.getUtente().subscribe(res1 => {
                console.log(res1.email);
            });
            this.navController.navigateRoot('/tabs');
        },
            (err: HttpErrorResponse) => {
                if (err.status === 401) {
                    console.error('login request error: ' + err.status);
                    this.showLoginError();
                }
            });
    }

    onReg() {
        this.navController.navigateRoot('registration');
    }

    async showLoginError() {
        const alert = await this.alertController.create({
            header: 'Attenzione',
            message: 'Email e/o Password errate',
            buttons: ['OK']
        });

        await alert.present();
    }


    private initTranslate() {
        this.translateService.get('LOGIN_ERROR_SUB_TITLE').subscribe((data) => {
            this.loginSubTitle = data;
        });
        this.translateService.get('LOGIN_ERROR_TITLE').subscribe((data) => {
            this.loginTitle = data;
        });
    }

}
