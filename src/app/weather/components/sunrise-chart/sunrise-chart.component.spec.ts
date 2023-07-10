import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SunriseChartComponent } from './sunrise-chart.component';

describe('SunriseChartComponent', () => {
  let component: SunriseChartComponent;
  let fixture: ComponentFixture<SunriseChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SunriseChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SunriseChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
