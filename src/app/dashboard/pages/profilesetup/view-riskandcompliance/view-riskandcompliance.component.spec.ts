import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRiskandcomplianceComponent } from './view-riskandcompliance.component';

describe('ViewRiskandcomplianceComponent', () => {
  let component: ViewRiskandcomplianceComponent;
  let fixture: ComponentFixture<ViewRiskandcomplianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRiskandcomplianceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRiskandcomplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
