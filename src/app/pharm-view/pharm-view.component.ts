import { Component, OnInit } from '@angular/core';
import { PharmServiceService } from '../pharm-service.service';
// firebase imports starts here
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
// import router
import { Router } from '@angular/router';

@Component({
  selector: 'app-pharm-view',
  templateUrl: './pharm-view.component.html',
  styleUrls: ['./pharm-view.component.scss']
})
export class PharmViewComponent implements OnInit {
  
  pharmData;
  pharmObj = {};

  constructor(private angularFS: AngularFirestore, private router: Router, private pharmService: PharmServiceService) {

    this.pharmData = this.angularFS.doc('pharmacies/'+ localStorage.getItem('userId')).valueChanges();
    this.pharmData.subscribe(data => {
      this.pharmObj = data;
    })
   }

  ngOnInit() {
  }

  onLogout(){
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    this.pharmService.logoutBehavoir.next(true);
    this.router.navigate(['/home']);
  }

}
