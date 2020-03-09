import { Component, OnInit, Input } from '@angular/core';
import { AddtocartService } from '../addtocart.service';

@Component({
  selector: 'app-conflict-warnning',
  templateUrl: './conflict-warnning.component.html',
  styleUrls: ['./conflict-warnning.component.scss']
})
export class ConflictWarnningComponent implements OnInit {
  item;
  conflictDrugsNames;

  constructor(private service :AddtocartService) { 
  }

  ngOnInit() { 
    this.service.warnningUpdate.subscribe(obj=>{
      this.item = obj;
    });

    this.service.drugsNamesUpdate.subscribe(str =>{
      this.conflictDrugsNames = str;
    });
  }

  userChoice(e){
    let flag = false;
    if(e.target.value == 'add'){

      // update ignore array
      // first check if this obj pushed before or not
      // if not --> push it

      if(this.service.ignoreConflictArr[0]){
        for (let i = 0; i< this.service.ignoreConflictArr.length; i++){
          if(this.item.id == this.service.ignoreConflictArr[i]['id']){
            flag = true;
          }
        }
      }
      if(flag == false){
        this.service.ignoreConflictArr.push(this.item);
        sessionStorage.setItem('ignoreArr', JSON.stringify(this.service.ignoreConflictArr));
      }

      // call the function of 'add to cart' again
      this.service.addToCart(this.item);
    }
  }

}
