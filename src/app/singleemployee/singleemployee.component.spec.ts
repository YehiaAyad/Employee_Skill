import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleemployeeComponent } from './singleemployee.component';

describe('SingleemployeeComponent', () => {
  let component: SingleemployeeComponent;
  let fixture: ComponentFixture<SingleemployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleemployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleemployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
