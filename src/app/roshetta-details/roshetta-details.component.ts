import { Component, OnInit, AfterViewInit } from "@angular/core";
import { AddtocartService } from "../addtocart.service";

@Component({
  selector: "app-roshetta-details",
  templateUrl: "./roshetta-details.component.html",
  styleUrls: ["./roshetta-details.component.scss"]
})
export class RoshettaDetailsComponent implements OnInit {
  roshettaDetails;
  constructor(private service: AddtocartService) {
    this.service.roshettaDetails.subscribe(item => {
      this.roshettaDetails = item;
    });
  }

  ngOnInit() {}
  // deletRoshetta() {
  //   this.service.setRoshettaDetails(false);
  //   this.service.formatRoshettaForm(true);
  //   sessionStorage.removeItem("roshettaDetails");
  // }
}
