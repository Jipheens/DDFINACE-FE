import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatingCompanyInfoComponent } from './updating-company-info.component';

describe('UpdatingCompanyInfoComponent', () => {
  let component: UpdatingCompanyInfoComponent;
  let fixture: ComponentFixture<UpdatingCompanyInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatingCompanyInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatingCompanyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
