import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEnvironmentalComponent } from './view-environmental.component';

describe('ViewEnvironmentalComponent', () => {
  let component: ViewEnvironmentalComponent;
  let fixture: ComponentFixture<ViewEnvironmentalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEnvironmentalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEnvironmentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
