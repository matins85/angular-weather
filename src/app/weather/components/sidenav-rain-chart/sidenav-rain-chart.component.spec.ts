import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavRainChartComponent } from './sidenav-rain-chart.component';

describe('SidenavRainChartComponent', () => {
  let component: SidenavRainChartComponent;
  let fixture: ComponentFixture<SidenavRainChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SidenavRainChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavRainChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
