import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanksLookupComponent } from './banks-lookup.component';

describe('BanksLookupComponent', () => {
  let component: BanksLookupComponent;
  let fixture: ComponentFixture<BanksLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BanksLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BanksLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
