import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class AddtocartService {
  route;
  count = 0;
  constructor(location: Location, router: Router) {
    router.events.subscribe((val) => {
      if(location.path() != ''){
        this.route = location.path();
      } else {
        this.route = 'Home'
      }
      // console.log(this.route)
    });
  }


private routerBehavior = new BehaviorSubject(this.route) 
  routeUrl = this.routerBehavior.asObservable()

  geturl(){
    this.routerBehavior.next(this.route);
    console.log('from service: this.router.url = ', this.route);
  }


  counterArr=[]

  private CounterBehavior = new BehaviorSubject(0) 
  cartCounter = this.CounterBehavior.asObservable()

  viewCartLength(obj){
    // get the array length to view in cart icon 
    this.counterArr.push(obj);
    this.CounterBehavior.next(this.counterArr.length);
  }






  cartArr=[]

  private cartBehavior = new BehaviorSubject([]) 
  cartItems = this.cartBehavior.asObservable()

  viewCartItems(obj){
    //if to check if array exist
    if(this.cartArr[0]){
      let flag = false;
      let index;
      for(let i = 0 ; i<this.cartArr.length ; i ++){
        if(this.cartArr[i].id==obj.id){
          flag = true;
          index = i;
          console.log(flag,1)
        }
      }
      if(flag){
        this.cartArr[index].quantity++
        console.log(flag,2)
      }else{
        obj.quantity = 1;
        this.cartArr.push(obj)
      }
      //if the arry no exist push 1st item in it 
    }else{
      obj.quantity= 1
      this.cartArr.push(obj)
    }
    this.cartBehavior.next(this.cartArr);

    console.log(this.cartArr);
   }
  




  
}
