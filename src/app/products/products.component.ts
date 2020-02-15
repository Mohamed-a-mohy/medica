import { Component, OnInit,Input } from '@angular/core';

// firebase imports starts here
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
//endhere

// serve import
import { AddtocartService } from '../addtocart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {
  // @Input() item;
  arrOfData;
  
  constructor(private angularFS: AngularFirestore,
    private service: AddtocartService) { 
      this.arrOfData = this.service.dbData;
    }

  ngOnInit() {}
}

