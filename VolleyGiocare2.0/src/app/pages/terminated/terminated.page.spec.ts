import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminatedPage } from './terminated.page';

describe('TerminatedPage', () => {
  let component: TerminatedPage;
  let fixture: ComponentFixture<TerminatedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminatedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminatedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
