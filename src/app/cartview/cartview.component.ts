import { Component, OnInit, Input, AfterViewChecked } from "@angular/core";
import { AddtocartService } from "../addtocart.service";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { ScheduleService } from "../schedule.service";

@Component({
  selector: "app-cartview",
  templateUrl: "./cartview.component.html",
  styleUrls: ["./cartview.component.scss"]
})
export class CartviewComponent implements OnInit, AfterViewChecked {
  @Input() item;
  itemsInCart;
  totalPrice;
  roshettaDetails;
  scheduleForm;
  date;
  scheduleList;
  scheduleCheckStatus;
  roshettaScheduleStatus;
  counter;
  constructor(
    private fb: FormBuilder,
    private service: AddtocartService,
    private scheduleService: ScheduleService
  ) {
    this.service.roshettaDetails.subscribe(item => {
      this.roshettaDetails = item;
    });
  }

  ngOnInit() {
    this.scheduleCheckStatus = this.scheduleInSession();
    this.roshettaScheduleStatus = JSON.parse(
      sessionStorage.getItem("roshettaDetails")
    )["scheduleDetails"];
    this.service.cartItems.subscribe(items => {
      this.itemsInCart = items;
    });

    this.service.totalPriceObs.subscribe(totalPrice => {
      this.totalPrice = totalPrice;
    });
    //check if there is a schedule in session
    if (this.scheduleInSession() != null) {
      this.scheduleForm = this.fb.group({
        schedule: this.scheduleInSession().schedule,
        calendar: new Date(this.scheduleInSession().date)
      });
    } else {
      this.scheduleForm = this.fb.group({
        scheduleCheck: false,
        schedule: "week",
        calendar: new Date(Date.now())
      });
    }
    this.service.cartCounter.subscribe(arrLength => {
      this.counter = arrLength;
    });
  }

  ngAfterViewChecked(): void {
    if (this.scheduleInSession() != null) {
      document.querySelector(".active").classList.remove("active");
      document
        .querySelector(`input[value=${this.scheduleInSession().schedule}]`)
        .parentElement.classList.add("active");
    }
  }

  scheduleChecked(e) {
    this.scheduleService.scheduleChecked(e);
  }
  changeDate(e) {
    this.scheduleService.changeDate(this.scheduleForm);
  }
  changeShedule(e) {
    this.scheduleService.changeShedule(e, this.scheduleForm);
  }
  addProductToScheduleList(e) {
    this.scheduleService.addProductToScheduleList(e, this.scheduleForm);
  }
  addRoshettaToScheduleList(e) {
    this.scheduleService.addRoshettaToScheduleList(e, this.scheduleForm);
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
      return this.cartViewSchedule();
    } else {
      return null;
    }
  }
  cartViewSchedule() {
    return this.scheduleService.cartViewSchedule();
  }
  checkOutClick() {
    if (!localStorage.getItem("userId")) {
      sessionStorage.setItem("checkOutPath", "/order-summery");
    }
  }
  deletRoshetta() {
    this.service.setRoshettaDetails(false);
    this.service.formatRoshettaForm(true);
    sessionStorage.removeItem("roshettaDetails");
  }
}
