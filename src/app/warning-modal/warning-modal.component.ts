import { Component, OnInit, Input } from '@angular/core';
import { AddtocartService } from '../addtocart.service'

@Component({
  selector: 'app-warning-modal',
  templateUrl: './warning-modal.component.html',
  styleUrls: ['./warning-modal.component.scss']
})
export class WarningModalComponent implements OnInit {
  item;
  constructor(private service :AddtocartService) { 
    this.service.warnningUpdate.subscribe(obj=>{
      this.item= obj;
    });
  }

  ngOnInit() {
  }

  userChoice(e){
    console.log('from userChoice function of \'warning component\' : ', this.item)
    let flag = false;
    if(e.target.value == 'add'){

      // update ignore array
      // first check if this obj pushed before or not
      // if not --> push it

      if(this.service.ignoreConflictArr[0]){
        for (let i = 0; i< this.service.ignoreConflictArr.length; i++){
          if(this.item.id == this.service.ignoreConflictArr[i].id){
            flag = true;
          }
        }
      }
      if(flag == false){
        this.service.ignoreConflictArr.push(this.item);
        sessionStorage.setItem('ignoreArr', JSON.stringify(this.service.ignoreConflictArr));
      }

      // call the function of 'add to cart' again
      this.service.viewCartItems(this.item);
      console.log(this.service.ignoreConflictArr)
    }
    console.log(e.target.value)
  }

}
