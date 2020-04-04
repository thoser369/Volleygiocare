import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuovaPartitaPage } from './nuova-partita.page';

describe('NewMatchPage', () => {
  let component: NuovaPartitaPage;
  let fixture: ComponentFixture<NuovaPartitaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuovaPartitaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuovaPartitaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
