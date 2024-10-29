import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinRechargeComponent } from './coin-recharge.component';

describe('CoinRechargeComponent', () => {
  let component: CoinRechargeComponent;
  let fixture: ComponentFixture<CoinRechargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoinRechargeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoinRechargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
