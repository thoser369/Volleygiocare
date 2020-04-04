import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-sscreen',
    templateUrl: './splashscreen.page.html',
    styleUrls: ['./splashscreen.page.scss'],
})
export class SplashscreenPage implements OnInit {

    private loading;

    constructor( private navController: NavController) {
    }

    ngOnInit() {
        setTimeout(() => {
            this.navController.navigateRoot('/login');
        }, 1500);

    }

}
