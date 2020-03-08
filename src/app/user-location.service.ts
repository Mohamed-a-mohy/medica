import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserLocationService {

  // observable of warnning message if user didn't choose one method to locate him
  notLocatedBehavior = new BehaviorSubject(false);
  notLocatedObs = this.notLocatedBehavior.asObservable();

  // observable to change initial value of searsh word on the map
  searchWordBehavior = new BehaviorSubject("Alexandria");
  searchWordObs = this.searchWordBehavior.asObservable();

  // observable of user coordinates
  coordinatesArr = [];
  coordinatesArrBehavior = new BehaviorSubject([]);
  coordinatesArrObs = this.coordinatesArrBehavior.asObservable();

  constructor() { }

  getUserCurrentLocation(){
    // if user drag on map then decided to get his current location
    // then array will be empty again to avoid him submit without choosing
    if(this.coordinatesArr[0]){
      this.coordinatesArr = [];
      this.coordinatesArrBehavior.next([]);
    }

    // get the current location of user
    let lat;
    let lng;
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position =>{
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        this.coordinatesArr = [lng, lat];
        this.coordinatesArrBehavior.next(this.coordinatesArr);
        console.log(lat, lng)
      });
    }else{
      alert('geolocation not supported on your browser')
    }
  }
}
