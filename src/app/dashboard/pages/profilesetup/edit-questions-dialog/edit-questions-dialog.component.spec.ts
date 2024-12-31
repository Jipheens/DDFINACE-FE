import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuestionsDialogComponent } from './edit-questions-dialog.component';

describe('EditQuestionsDialogComponent', () => {
  let component: EditQuestionsDialogComponent;
  let fixture: ComponentFixture<EditQuestionsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditQuestionsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditQuestionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
