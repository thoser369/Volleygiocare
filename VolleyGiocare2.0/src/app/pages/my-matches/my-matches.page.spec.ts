import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMatchesPage } from './my-matches.page';

describe('MyMatchesPage', () => {
  let component: MyMatchesPage;
  let fixture: ComponentFixture<MyMatchesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyMatchesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMatchesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
