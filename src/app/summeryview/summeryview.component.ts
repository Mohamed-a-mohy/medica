import { Component, OnInit } from '@angular/core';
import { AddtocartService } from '../addtocart.service';
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";


@Component({
  selector: 'app-summeryview',
  templateUrl: './summeryview.component.html',
  styleUrls: ['./summeryview.component.scss']
})
export class SummeryviewComponent implements OnInit {
  myForm: FormGroup;
  itemsInCart;

  constructor(private service: AddtocartService,
              private fb: FormBuilder,
    ) { }

  ngOnInit() {
    this.service.cartItems.subscribe(items => {
      this.itemsInCart = items;})



      this.myForm = this.fb.group(
        {
          phone: ["", [Validators.required,  Validators.pattern(/^[0-9\w]{11,}$/)]],
          address:["",[Validators.required]]
        }
        
      );

  }
}