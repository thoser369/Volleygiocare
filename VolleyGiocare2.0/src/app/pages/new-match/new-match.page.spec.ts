import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMatchPage } from './new-match.page';

describe('NewMatchPage', () => {
  let component: NewMatchPage;
  let fixture: ComponentFixture<NewMatchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMatchPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMatchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
