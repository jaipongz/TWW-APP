import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordSubComponent } from './forgot-password-sub.component';

describe('ForgotPasswordSubComponent', () => {
  let component: ForgotPasswordSubComponent;
  let fixture: ComponentFixture<ForgotPasswordSubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForgotPasswordSubComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
