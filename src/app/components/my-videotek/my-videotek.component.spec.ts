import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyVideotekComponent } from './my-videotek.component';

describe('MyVideotekComponent', () => {
  let component: MyVideotekComponent;
  let fixture: ComponentFixture<MyVideotekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyVideotekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyVideotekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
