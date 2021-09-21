import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertformComponent } from './certform.component';

describe('CertformComponent', () => {
  let component: CertformComponent;
  let fixture: ComponentFixture<CertformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
