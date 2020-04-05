import {Component, OnInit} from '@angular/core';
import {AlertController, NavController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Account, UtenteService} from '../../services/utente.service';
import {HttpErrorResponse} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-registration',
    templateUrl: './registrazione.page.html',
    styleUrls: ['./registrazione.page.scss'],
})
export class RegistrazionePage implements OnInit {
    private signUpFormModel: FormGroup;
    private loginTitle: string;
    private loginSubTitle: string;


    constructor(private navController: NavController,
                private formBuilder: FormBuilder,
                private utenteService: UtenteService,
                private alertController: AlertController,
                private translateService: TranslateService) {
    }

    ngOnInit() {
        this.signUpFormModel = this.formBuilder.group({
            nome: ['', Validators.compose([
                Validators.required
            ])],
            cognome: ['', Validators.compose([
                Validators.required
            ])],
            email: ['', Validators.compose([
                Validators.required, Validators.email
            ])],
            password: ['', Validators.compose([
                Validators.required
            ])],
            numero_telefonico: ['', Validators.compose([
                Validators.required
            ])],
            ruolo: [Validators.compose([
                Validators.required]
            )]
        });
        this.initTranslate();
    }


    onRegistrazione() {
        const account: Account = this.signUpFormModel.value;
        this.utenteService.Registrazione(account).subscribe(() => {
                this.signUpFormModel.reset();
                // this.showLoginError('Esegui il login', 'Utente creato');
                this.navController.navigateRoot('/login');
                // this.router.navigate(['login']);
            },
            (err: HttpErrorResponse) => {
                if (err.status === 401) {
                    console.error('login request error: ' + err.status);
                    this.showLoginError(err.error, 'error');
                }
                if (err.status === 501) {
                    console.error('login request error: ' + err.status);
                    this.showLoginError(err.error, 'error');
                }
                if (err.status === 500) {
                    console.error('login request error: ' + err.status);
                    this.showLoginError(err.error, 'error');
                }
                if (err.ok) {
                    console.log('Ok tutt appost.');
                }


            }
        );
    }

    onLogin() {
        this.navController.navigateRoot('login');
    }

    changeL(event) {
        console.log(event.detail.value);
    }

    async showLoginError(errMessage, header) {
        const alert = await this.alertController.create({
            header,
            message: errMessage,
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
