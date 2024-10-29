import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNovelComponent } from './edit-novel.component';

describe('EditNovelComponent', () => {
  let component: EditNovelComponent;
  let fixture: ComponentFixture<EditNovelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditNovelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditNovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
