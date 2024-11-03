import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovelFormComponent } from './novel-form.component';

describe('NovelFormComponent', () => {
  let component: NovelFormComponent;
  let fixture: ComponentFixture<NovelFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NovelFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
