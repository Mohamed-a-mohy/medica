import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { GetProductsDataService } from './get-products-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // -----------------------------------------------------------
  // properties
  // -----------------------------------------------------------
  title:string = 'medica';
  arrOfItems:Array<object>;
  conflictArr:Array<object>;
  pharmacy:boolean;

  constructor(
    private loginService: LoginService,
    private getDataService: GetProductsDataService) {

    // ------------------------------------------------------
    // know if user/pharmacy login or logout
    // ------------------------------------------------------
    this.loginService.checkLogin$.subscribe(state => {
      if(state == 'pharmacy'){
        this.pharmacy = true;
      }else{
        this.pharmacy = false;
      }
    });

    // ------------------------------------------------------
    // get data from database
    // ------------------------------------------------------
    this.getDataService.productDataObs.subscribe(arr => this.arrOfItems = arr);
    this.getDataService.conflictDataObs.subscribe(arr => this.conflictArr = arr);
  }

  ngOnInit() { }
}