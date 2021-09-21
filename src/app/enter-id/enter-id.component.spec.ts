import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterIdComponent } from './enter-id.component';

describe('EnterIdComponent', () => {
  let component: EnterIdComponent;
  let fixture: ComponentFixture<EnterIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
