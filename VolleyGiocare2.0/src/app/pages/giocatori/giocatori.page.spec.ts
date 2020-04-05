import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {GiocatoriPage} from './giocatori.page';

describe('FeedbackGiocatoriPage', () => {
    let component: GiocatoriPage;
    let fixture: ComponentFixture<GiocatoriPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GiocatoriPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(GiocatoriPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
