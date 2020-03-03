import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SscreenPage } from './sscreen.page';

describe('SscreenPage', () => {
  let component: SscreenPage;
  let fixture: ComponentFixture<SscreenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SscreenPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SscreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
