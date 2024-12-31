import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFinancialperformanceComponent } from './view-financialperformance.component';

describe('ViewFinancialperformanceComponent', () => {
  let component: ViewFinancialperformanceComponent;
  let fixture: ComponentFixture<ViewFinancialperformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFinancialperformanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFinancialperformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
