import { Component, OnInit } from '@angular/core';
import { AddtocartService } from '../addtocart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

arrOfData = []
category = []



  constructor(private service: AddtocartService) {
    this.service.getData.subscribe(items => {
      this.arrOfData = items;
      console.log(this.arrOfData);
      if(this.arrOfData[0]){
        for (let i = 0; i < this.arrOfData.length; i++) {
          if (this.category[0]) {
            for (let j = 0; j < this.category.length; j++) {
              if (this.category.indexOf(this.arrOfData[i].category) == -1 && this.arrOfData[i].category != undefined) {
                this.category.push(this.arrOfData[i].category)
              }
            }
          } else {
            this.category.push(this.arrOfData[i].category)
          }
        }
        console.log(this.arrOfData);
        console.log(this.category);
      }})
  }
 

  ngOnInit() {
    
      
      
  }

}
