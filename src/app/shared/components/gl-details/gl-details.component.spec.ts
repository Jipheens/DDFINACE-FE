import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlDetailsComponent } from './gl-details.component';

describe('GlDetailsComponent', () => {
  let component: GlDetailsComponent;
  let fixture: ComponentFixture<GlDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
