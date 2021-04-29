import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVideotekComponent } from './add-videotek.component';

describe('AddVideotekComponent', () => {
  let component: AddVideotekComponent;
  let fixture: ComponentFixture<AddVideotekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVideotekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVideotekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
