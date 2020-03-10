import { Component, OnInit, Input } from '@angular/core';
import { AddtocartService } from '../addtocart.service';

@Component({
  selector: 'app-conflict-warnning',
  templateUrl: './conflict-warnning.component.html',
  styleUrls: ['./conflict-warnning.component.scss']
})
export class ConflictWarnningComponent implements OnInit {
  item:object;
  conflictDrugsNames:string;

  constructor(private service :AddtocartService) { 
  }

  ngOnInit() { 
    this.service.warnningUpdate.subscribe(obj=>{
      this.item = obj;
      if(this.item['quantity'] == 0){
        this.service.warningQuantityObs.subscribe(num => {
          if(num > 0){
            this.item['quantity'] = num;
          }
        })
      }
    });

    this.service.drugsNamesUpdate.subscribe(str =>{
      this.conflictDrugsNames = str;
    });
  }

  userChoice(){
    // first check if this obj pushed before to ignore array or not, if not --> push it
    let objExist:Array<object> = [];
    objExist = this.service.ignoreConflictArr.filter(obj => this.item['id'] == obj['id']);
    if(objExist.length < 1){
      this.service.ignoreConflictArr.push(this.item);
      sessionStorage.setItem('ignoreArr', JSON.stringify(this.service.ignoreConflictArr));
    }

    // call the function of 'add to cart' again
    let increaseQuantity:boolean;
    this.item['quantity'] > 0 ? increaseQuantity = false : increaseQuantity = true;
    this.service.addToCart(this.item, increaseQuantity);
    this.service.warnningBehavior.next({});
    this.service.warningQuantityBehavior.next(0);
  }

}
