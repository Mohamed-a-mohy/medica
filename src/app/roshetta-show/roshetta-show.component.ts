import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-roshetta-show',
  templateUrl: './roshetta-show.component.html',
  styleUrls: ['./roshetta-show.component.scss']
})
export class RoshettaShowComponent implements OnInit {
  @Input() roshetta:object;
  constructor() { }

  ngOnInit() {
  }

}
