import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNovelEpComponent } from './create-novel-ep.component';

describe('CeateNovelEpComponent', () => {
  let component: CreateNovelEpComponent;
  let fixture: ComponentFixture<CreateNovelEpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateNovelEpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNovelEpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
