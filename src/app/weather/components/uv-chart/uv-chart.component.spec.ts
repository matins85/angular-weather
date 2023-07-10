import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UvChartComponent } from './uv-chart.component';

describe('UvChartComponent', () => {
  let component: UvChartComponent;
  let fixture: ComponentFixture<UvChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ UvChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UvChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
