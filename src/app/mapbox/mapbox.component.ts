import { Component, OnInit } from '@angular/core';
import { MapMouseEvent } from 'mapbox-gl';
import { Map } from 'mapbox-gl';
import { UserLocationService } from '../user-location.service';

@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.scss']
})
export class MapboxComponent implements OnInit {

  searchWord;
  map: Map;

  constructor(private locService: UserLocationService) { }

  ngOnInit() {
      // observable to change initial value of searsh word on the map
      this.locService.searchWordObs.subscribe(word => {
        this.searchWord = word;
      })
  }

  // style of dragable circle on map
  layerPaint = {
    'circle-radius': 12,
    'circle-color': '#05a19c'
  };

  changeColor(color: string) {
    this.layerPaint = { ...this.layerPaint, 'circle-color': color };
  }

  // start on map by using these coordinates to center it
  coordinates = [29.918743783419217, 31.19805641493292];

  // change coordinates on drag
  onDrag(event: MapMouseEvent) {
    this.coordinates = event.lngLat.toArray();
    this.locService.coordinatesArr = this.coordinates;
    this.locService.coordinatesArrBehavior.next(this.coordinates);
    console.log(this.coordinates)
  }

}
