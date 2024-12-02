import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryNovelComponent } from './category-novel.component';

describe('CategoryNovelComponent', () => {
  let component: CategoryNovelComponent;
  let fixture: ComponentFixture<CategoryNovelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryNovelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryNovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
