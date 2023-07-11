import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import * as L from 'leaflet';
import { RedMap } from 'src/app/model/weather';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-global-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './global-map.component.html',
  styleUrls: ['./global-map.component.scss'],
})
export class GlobalMapComponent {
  private map: any;

  private initMap(): void {
    // this.map = L.map('map', {
    //   center: [10.5078609, 7.4289407],
    //   zoom: 12,
    // });
    this.map = L.map('map').setView([10.5078609, 7.4289407], 12);

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );
    tiles.addTo(this.map);
  }

  constructor(
    // public nodeService: NodeService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.initMap();
    this.makeCapitalCircleRedMarkers(this.map);
  }

  makeCapitalRedPopup(data: any): string {
    return (
      `` + `<div>Program: ${data.name}</div>`
      // `<div>State: ${data.state}</div>` +
      // `<div>Population: ${data.population}</div>`
    );
  }

  makeCapitalCircleRedMarkers(map: L.Map): void {
    // this.http.get<any[]>('assets/geojsonred.json').subscribe(
    //   (res: any) => {
    for (const c of RedMap.features) {
      const lon = c.geometry.coordinates[1];
      const lat = c.geometry.coordinates[0];
      const circle = L.circleMarker([lat, lon], { radius: 7 });
      circle.bindTooltip(this.makeCapitalGreyPopup(c.properties));
      // Build the component for showing in the marker popup
      circle.addTo(map);
      circle.setStyle({ color: '#B83030' });
      circle.setStyle({ fillColor: '#B83030' });
      circle.setStyle({ fillOpacity: 1 });
    }
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
  }

  makeCapitalGreyPopup(data: any): string {
    return (
      `` + `<div>Program: ${data.name}</div>`
      // `<div>State: ${data.state}</div>` +
      // `<div>Population: ${data.population}</div>`
    );
  }
}
