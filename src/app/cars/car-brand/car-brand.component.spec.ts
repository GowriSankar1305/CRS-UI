import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarBrandComponent } from './car-brand.component';

describe('CarBrandComponent', () => {
  let component: CarBrandComponent;
  let fixture: ComponentFixture<CarBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarBrandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
