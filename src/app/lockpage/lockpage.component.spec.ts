import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockpageComponent } from './lockpage.component';

describe('LockpageComponent', () => {
  let component: LockpageComponent;
  let fixture: ComponentFixture<LockpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LockpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LockpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
