import { Component, OnInit, Input } from "@angular/core";
import { AddtocartService } from "../addtocart.service";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: "app-cartview",
  templateUrl: "./cartview.component.html",
  styleUrls: ["./cartview.component.scss"]
})
export class CartviewComponent implements OnInit {
  @Input() item;
  itemsInCart;
  totalPrice;
  roshettaDetails;
  scheduleForm;
  scheduleText;
  daysArray;
  date;
  scheduleList;
  scheduledAreaShow;
  scheduleCheckStatus;
  scheduleCheckStatusObj = {};
  roshettaScheduleStatus;
  constructor(private fb: FormBuilder, private service: AddtocartService) {
    this.service.roshettaDetails.subscribe(item => {
      this.roshettaDetails = item;
    });
    this.scheduledAreaShow = this.scheduleInSession();
    this.addCheckSign();
  }

  ngOnInit() {
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
    this.daysArray = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "friday",
      "Saturday"
    ];
    this.scheduleText = `scheduled on ${
      this.daysArray[this.date.getDay()]
    } of every week`;
  }

  scheduleChecked(e) {
    if (!e.checked) {
      this.scheduledAreaShow = null;
      let editCartView = JSON.parse(sessionStorage.getItem("cartView"));
      for (let i = 0; i < editCartView.length; i++) {
        if (editCartView[i]["scheduleDetails"]) {
          delete editCartView[i]["scheduleDetails"];
        }
      }
      if (sessionStorage.getItem("roshettaDetails")) {
        let editRoshettaDetails = JSON.parse(
          sessionStorage.getItem("roshettaDetails")
        );
        if (editRoshettaDetails["scheduleDetails"]) {
          delete editRoshettaDetails["scheduleDetails"];
          sessionStorage.setItem(
            "roshettaDetails",
            JSON.stringify(editRoshettaDetails)
          );
        }
      }
      sessionStorage.setItem("cartView", JSON.stringify(editCartView));
    }
  }
  changeDate(e) {
    this.changeScheduleText();
    let editCartView = JSON.parse(sessionStorage.getItem("cartView"));
    for (let i = 0; i < editCartView.length; i++) {
      if (editCartView[i]["scheduleDetails"]) {
        editCartView[i]["scheduleDetails"][
          "date"
        ] = this.scheduleForm.value.calendar.toLocaleString();
      }
    }
    if (sessionStorage.getItem("roshettaDetails")) {
      let editRoshettaDetails = JSON.parse(
        sessionStorage.getItem("roshettaDetails")
      );
      if (editRoshettaDetails["scheduleDetails"]) {
        editRoshettaDetails["scheduleDetails"][
          "date"
        ] = this.scheduleForm.value.calendar.toLocaleString();
        sessionStorage.setItem(
          "roshettaDetails",
          JSON.stringify(editRoshettaDetails)
        );
      }
    }
    sessionStorage.setItem("cartView", JSON.stringify(editCartView));
  }
  changeShedule(e) {
    this.scheduleForm.value.schedule = e.target.value;
    this.changeScheduleText();
    let editCartView = JSON.parse(sessionStorage.getItem("cartView"));
    for (let i = 0; i < editCartView.length; i++) {
      if (editCartView[i]["scheduleDetails"]) {
        editCartView[i]["scheduleDetails"][
          "schedule"
        ] = this.scheduleForm.value.schedule;
      }
    }
    if (sessionStorage.getItem("roshettaDetails")) {
      let editRoshettaDetails = JSON.parse(
        sessionStorage.getItem("roshettaDetails")
      );
      if (editRoshettaDetails["scheduleDetails"]) {
        editRoshettaDetails["scheduleDetails"][
          "schedule"
        ] = this.scheduleForm.value.schedule;
        sessionStorage.setItem(
          "roshettaDetails",
          JSON.stringify(editRoshettaDetails)
        );
      }
    }
    sessionStorage.setItem("cartView", JSON.stringify(editCartView));
  }

  changeScheduleText() {
    if (this.scheduleForm.value.schedule == "2weeks") {
      this.scheduleText = `scheduled on ${
        this.daysArray[this.scheduleForm.value.calendar.getDay()]
      } of every 2 weeks`;
    } else if (this.scheduleForm.value.schedule == "month") {
      this.scheduleText = `scheduled on the ${this.scheduleForm.value.calendar.getDate()}th of every month`;
    } else {
      this.scheduleText = `scheduled on ${
        this.daysArray[this.scheduleForm.value.calendar.getDay()]
      } of every week`;
    }
  }

  addProductToScheduleList(e) {
    let editCartView = JSON.parse(sessionStorage.getItem("cartView"));
    for (let i = 0; i < editCartView.length; i++) {
      if (e.checked) {
        if (editCartView[i].id === e.source.id) {
          editCartView[i]["scheduleDetails"] = {
            schedule: this.scheduleForm.value.schedule,
            date: this.scheduleForm.value.calendar.toLocaleString()
          };
        }
      } else {
        if (editCartView[i]["scheduleDetails"]) {
          delete editCartView[i]["scheduleDetails"];
        }
      }
    }
    sessionStorage.setItem("cartView", JSON.stringify(editCartView));
  }
  addRoshettaToScheduleList(e) {
    let editRoshettaDetails = JSON.parse(
      sessionStorage.getItem("roshettaDetails")
    );
    if (e.checked) {
      editRoshettaDetails["scheduleDetails"] = {
        schedule: this.scheduleForm.value.schedule,
        date: this.scheduleForm.value.calendar.toLocaleString()
      };
    } else {
      delete editRoshettaDetails["scheduleDetails"];
    }
    sessionStorage.setItem(
      "roshettaDetails",
      JSON.stringify(editRoshettaDetails)
    );
  }

  // selectAll(e) {
  //   let checkboxesArr = document.getElementsByClassName("select");
  //   for (let i = 0; i < checkboxesArr.length; i++) {
  //     if (e.target.checked) {
  //       checkboxesArr[i].setAttribute("checked", "true");
  //     } else {
  //       checkboxesArr[i].removeAttribute("checked");
  //     }
  //   }
  //   let editCartView = JSON.parse(sessionStorage.getItem("cartView"));
  //   let editRoshettaDetails = JSON.parse(
  //     sessionStorage.getItem("roshettaDetails")
  //   );

  //   for (let i = 0; i < editCartView.length; i++) {
  //     if (e.target.checked) {
  //       editCartView[i]["scheduleDetails"] = {
  //         schedule: this.scheduleForm.value.schedule,
  //         date: this.scheduleForm.value.calendar.toLocaleString()
  //       };
  //       if (editRoshettaDetails) {
  //         editRoshettaDetails["scheduleDetails"] = {
  //           schedule: this.scheduleForm.value.schedule,
  //           date: this.scheduleForm.value.calendar.toLocaleString()
  //         };
  //         sessionStorage.setItem(
  //           "roshettaDetails",
  //           JSON.stringify(editRoshettaDetails)
  //         );
  //       }
  //     } else {
  //       if (editCartView[i]["scheduleDetails"]) {
  //         delete editCartView[i]["scheduleDetails"];
  //         if (editRoshettaDetails) {
  //           delete editRoshettaDetails["scheduleDetails"];
  //           sessionStorage.setItem(
  //             "roshettaDetails",
  //             JSON.stringify(editRoshettaDetails)
  //           );
  //         }
  //       }
  //     }
  //   }
  //   sessionStorage.setItem("cartView", JSON.stringify(editCartView));
  // }
  //add check sign if page refresh

  addCheckSign() {
    if (this.scheduleInSession() != null) {
      this.scheduleCheckStatus = true;
    }
    let checkboxesArr = document.getElementsByClassName("select");
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
    let cartviewProducts =JSON.parse(sessionStorage.getItem('cartView'))
    for(let i =0; i < cartviewProducts.length; i++){
      if (
        cartviewProducts[i]["scheduleDetails"]
      ) {
        return cartviewProducts[i]["scheduleDetails"];
      }
    }
    return null;
  }
}
