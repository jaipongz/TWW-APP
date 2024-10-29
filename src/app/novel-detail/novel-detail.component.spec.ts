import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovelDetailComponent } from './novel-detail.component';

describe('NovelDetailComponent', () => {
  let component: NovelDetailComponent;
  let fixture: ComponentFixture<NovelDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NovelDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovelDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
