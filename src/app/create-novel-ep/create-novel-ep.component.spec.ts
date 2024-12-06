import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeateNovelEpComponent } from './create-novel-ep.component';

describe('CeateNovelEpComponent', () => {
  let component: CeateNovelEpComponent;
  let fixture: ComponentFixture<CeateNovelEpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CeateNovelEpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CeateNovelEpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
