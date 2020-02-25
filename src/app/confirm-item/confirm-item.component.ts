import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-confirm-item',
  templateUrl: './confirm-item.component.html',
  styleUrls: ['./confirm-item.component.scss']
})
export class ConfirmItemComponent implements OnInit {
  @Input() item;
  constructor() { }

  ngOnInit() {
  }

}
