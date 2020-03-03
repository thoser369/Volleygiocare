import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-sscreen',
    templateUrl: './sscreen.page.html',
    styleUrls: ['./sscreen.page.scss'],
})
export class SscreenPage implements OnInit {

    private loading;

    constructor( private navController: NavController) {
    }

    ngOnInit() {
        setTimeout(() => {
            this.navController.navigateRoot('/login');
        }, 1500);

    }

}
