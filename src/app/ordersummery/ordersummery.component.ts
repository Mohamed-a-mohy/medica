import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ordersummery',
  templateUrl: './ordersummery.component.html',
  styleUrls: ['./ordersummery.component.scss']
})
export class OrdersummeryComponent implements OnInit {

  userLatLon;
  currLat;
  currLng;

  constructor() {
    console.log(this.currLng,this.currLat);
    this.getLocation()
    this.getCurrentLocation()
   }

  ngOnInit() {
    
  
    console.log(this.currLng,this.currLat);
    
    

  }

  

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } 
    this.userLatLon 
    console.log(this.userLatLon);
    

  }
  
  showPosition(position) {
   var lat = position.coords.latitude;
   var lon = position.coords.longitude;
   console.log(lat);
   

  // this.userLatLon = `${lat},${lon}`
  } 


  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {

        this.currLat = position.coords.latitude;
        this.currLng = position.coords.longitude;
        console.log(this.currLat,this.currLng);
      });
    }
    else {
      alert("Geolocation is not supported by this browser.");
    }
    console.log(this.currLat,this.currLng);
  }


}



