import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVideotekComponent } from './update-videotek.component';

describe('UpdateVideotekComponent', () => {
  let component: UpdateVideotekComponent;
  let fixture: ComponentFixture<UpdateVideotekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateVideotekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateVideotekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
