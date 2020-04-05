import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MiePartitePage} from './mie-partite.page';

describe('MyMatchesPage', () => {
    let component: MiePartitePage;
    let fixture: ComponentFixture<MiePartitePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MiePartitePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MiePartitePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
