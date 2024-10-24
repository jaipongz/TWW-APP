import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LitsComponent } from './lits.component';

describe('LitsComponent', () => {
  let component: LitsComponent;
  let fixture: ComponentFixture<LitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LitsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
