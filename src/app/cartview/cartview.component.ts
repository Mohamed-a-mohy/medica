import { Component, OnInit, Input, AfterViewInit } from "@angular/core";
import { AddtocartService } from "../addtocart.service";
import { FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { ScheduleService} from '../schedule.service';

@Component({
  selector: "app-cartview",
  templateUrl: "./cartview.component.html",
  styleUrls: ["./cartview.component.scss"]
})
export class CartviewComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
  }
  @Input() item;
  itemsInCart;
  totalPrice;
  roshettaDetails;
  scheduleForm;
  scheduleText;
  daysArray;
  date;
  scheduleList;
  // scheduledAreaShow;
  scheduleCheckStatus;
  scheduleCheckStatusObj = {};
  roshettaScheduleStatus;
  counter;
  constructor(private fb: FormBuilder,
     private service: AddtocartService,
    private router:Router,
    private scheduleService:ScheduleService) {
    this.service.roshettaDetails.subscribe(item => {
      this.roshettaDetails = item;
    });
    // this.scheduledAreaShow = this.scheduleInSession();
    this.addCheckSign();
    if (this.scheduleInSession() != null) { 
      this.scheduleCheckStatus = true;
    }
  }

  ngOnInit() {
    this.daysArray = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "friday",
      "Saturday"
    ];
    this.service.cartItems.subscribe(items => {
      this.itemsInCart = items;
    });

    this.service.totalPriceObs.subscribe(totalPrice => {
      this.totalPrice = totalPrice;
    });

    this.scheduleForm = this.fb.group({
      scheduleCheck: false,
      schedule: "week",
      calendar: new Date(Date.now())
    });
    this.date = new Date(this.scheduleForm.value.calendar.toLocaleString());
    this.scheduleText = `scheduled on ${
      this.daysArray[this.date.getDay()]
    }`;


    this.service.cartCounter.subscribe(arrLength=>{
      this.counter=arrLength;
    })
  }



  scheduleChecked(e) {
    this.scheduleService.scheduleChecked(e);
  }
  changeDate(e) {
    this.scheduleService.changeDate(this.scheduleForm)
  }
  changeShedule(e) {
    this.scheduleService.changeShedule(e, this.scheduleForm);
  }
  changeScheduleText() {
    this.scheduleText = this.scheduleService.changeScheduleText(this.scheduleForm);
  }

  addProductToScheduleList(e) {
    this.scheduleService.addProductToScheduleList(e,this.scheduleForm);
  }
  addRoshettaToScheduleList(e) {
    this.scheduleService.addRoshettaToScheduleList(e, this.scheduleForm)
  }
  addCheckSign() {
    
    let checkboxesArr = document.getElementsByClassName("select");
    console.log(document.getElementsByTagName('mat-checkbox'));
    // console.log(document.getElementsByClassName('select')['0']);
    
    
    let productsInSession = JSON.parse(sessionStorage.getItem("cartView"));
    for (let i = 0; i < productsInSession.length; i++) {
      for (let j = 0; j < checkboxesArr.length; j++) {
        if (
          productsInSession[i]["scheduleDetails"] &&
          productsInSession[i].id == checkboxesArr[i].id
        ) {
          this.scheduleCheckStatusObj[checkboxesArr[i].id] = true
        } else{
          this.scheduleCheckStatusObj[checkboxesArr[i].id] = false
        }
      }
    }
    if(sessionStorage.getItem('roshettaDetails') && JSON.parse(sessionStorage.getItem('roshettaDetails'))['scheduleDetails']){
      this.roshettaScheduleStatus =true;
    }
  }

  scheduleInSession() {
    if (
      JSON.parse(sessionStorage.getItem("roshettaDetails")) &&
      JSON.parse(sessionStorage.getItem("roshettaDetails"))["scheduleDetails"]
    ) {
      return JSON.parse(sessionStorage.getItem("roshettaDetails"))[
        "scheduleDetails"
      ];
    } else if (this.cartViewSchedule()) {
      return this.cartViewSchedule()
    } else {
      return null;
    }
  }
  cartViewSchedule(){
    return this.scheduleService.cartViewSchedule();
  }
  checkOutClick(){
    if(!localStorage.getItem('userId')){
      sessionStorage.setItem('checkOutPath', '/order-summery')
    }
  }
  deletRoshetta() {
    this.service.setRoshettaDetails(false);
    this.service.formatRoshettaForm(true);
    sessionStorage.removeItem("roshettaDetails");
  }
}
