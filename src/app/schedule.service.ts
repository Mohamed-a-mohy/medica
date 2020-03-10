import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  daysArray;
  constructor() { 
    this.daysArray = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "friday",
      "Saturday"
    ];
  }
  scheduleChecked(e) {
    if (!e.checked) {
      // this.scheduledAreaShow = null;
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
  changeDate(scheduleForm) {
    this.changeScheduleText(scheduleForm);
    let editCartView = JSON.parse(sessionStorage.getItem("cartView"));
    for (let i = 0; i < editCartView.length; i++) {
      if (editCartView[i]["scheduleDetails"]) {
        editCartView[i]["scheduleDetails"][
          "date"
        ] = scheduleForm.value.calendar.toLocaleString();
      }
    }
    if (sessionStorage.getItem("roshettaDetails")) {
      let editRoshettaDetails = JSON.parse(
        sessionStorage.getItem("roshettaDetails")
      );
      if (editRoshettaDetails["scheduleDetails"]) {
        editRoshettaDetails["scheduleDetails"][
          "date"
        ] = scheduleForm.value.calendar.toLocaleString();
        sessionStorage.setItem(
          "roshettaDetails",
          JSON.stringify(editRoshettaDetails)
        );
      }
    }
    sessionStorage.setItem("cartView", JSON.stringify(editCartView));
  }
  changeShedule(e, scheduleForm) {
    scheduleForm.value.schedule = e.target.value;
    this.changeScheduleText(scheduleForm);
    let editCartView = JSON.parse(sessionStorage.getItem("cartView"));
    for (let i = 0; i < editCartView.length; i++) {
      if (editCartView[i]["scheduleDetails"]) {
        editCartView[i]["scheduleDetails"][
          "schedule"
        ] = scheduleForm.value.schedule;
      }
    }
    if (sessionStorage.getItem("roshettaDetails")) {
      let editRoshettaDetails = JSON.parse(
        sessionStorage.getItem("roshettaDetails")
      );
      if (editRoshettaDetails["scheduleDetails"]) {
        editRoshettaDetails["scheduleDetails"][
          "schedule"
        ] = scheduleForm.value.schedule;
        sessionStorage.setItem(
          "roshettaDetails",
          JSON.stringify(editRoshettaDetails)
        );
      }
    }
    sessionStorage.setItem("cartView", JSON.stringify(editCartView));
  }
  changeScheduleText(scheduleForm) {
    return `scheduled on ${
          this.daysArray[scheduleForm.value.calendar.getDay()]
    }`;
  }
  addProductToScheduleList(e, scheduleForm) {
    let editCartView = JSON.parse(sessionStorage.getItem("cartView"));
    for (let i = 0; i < editCartView.length; i++) {
      if (e.checked) {
        if (editCartView[i].id === e.source.id) {
          editCartView[i]["scheduleDetails"] = {
            schedule: scheduleForm.value.schedule,
            date: scheduleForm.value.calendar.toLocaleString()
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
  addRoshettaToScheduleList(e, scheduleForm) {
    let editRoshettaDetails = JSON.parse(
      sessionStorage.getItem("roshettaDetails")
    );
    if (e.checked) {
      editRoshettaDetails["scheduleDetails"] = {
        schedule: scheduleForm.value.schedule,
        date: scheduleForm.value.calendar.toLocaleString()
      };
    } else {
      delete editRoshettaDetails["scheduleDetails"];
    }
    sessionStorage.setItem(
      "roshettaDetails",
      JSON.stringify(editRoshettaDetails)
    );
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
