import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannedPage } from './planned.page';

describe('PlannedPage', () => {
  let component: PlannedPage;
  let fixture: ComponentFixture<PlannedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlannedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
