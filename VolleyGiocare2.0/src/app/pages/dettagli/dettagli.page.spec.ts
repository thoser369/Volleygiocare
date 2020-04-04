import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DettagliPage } from './dettagli.page';

describe('DetailsPage', () => {
  let component: DettagliPage;
  let fixture: ComponentFixture<DettagliPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DettagliPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DettagliPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
