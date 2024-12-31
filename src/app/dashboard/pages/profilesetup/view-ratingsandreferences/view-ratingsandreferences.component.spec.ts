import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRatingsandreferencesComponent } from './view-ratingsandreferences.component';

describe('ViewRatingsandreferencesComponent', () => {
  let component: ViewRatingsandreferencesComponent;
  let fixture: ComponentFixture<ViewRatingsandreferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRatingsandreferencesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRatingsandreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
