import { Component, OnInit, AfterViewInit } from "@angular/core";
import { AddtocartService } from "../addtocart.service";

@Component({
  selector: "app-roshetta-details",
  templateUrl: "./roshetta-details.component.html",
  styleUrls: ["./roshetta-details.component.scss"]
})
export class RoshettaDetailsComponent implements OnInit {
  roshettaDetails;
  scheduleText;
  constructor(private service: AddtocartService) {
    this.service.roshettaDetails.subscribe(item => {
      this.roshettaDetails = item;
      //////////////.......... add schedualed details in the cart section......./////////////
      if (item) {
        if (item.roshettaSchedualCheck) {
          let date = new Date(Date.now());
          let days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "friday",
            "Saturday"
          ];
          if (item.roshettaSchedual == "2weeks") {
            this.scheduleText = `schedualed on ${
              days[date.getDay()]
            } of every 2 weeks`;
          } else if (item.roshettaSchedual == "month") {
            this.scheduleText = `schedualed on the ${date.getDate()}th of every month`;
          } else {
            this.scheduleText = `schedualed on ${
              days[date.getDay()]
            } of every week`;
          }
        } else {
          this.scheduleText = "There is no schedule";
        }
      }
    });
  }

  ngOnInit() {}
  deletRoshetta() {
    this.service.setRoshettaDetails(false);
    this.service.formatRoshettaForm(true);
    sessionStorage.removeItem("roshettaDetails");
  }
}
