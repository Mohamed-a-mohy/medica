import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRoleGuardService {

  constructor(private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let cartArr:Array<object> = JSON.parse(sessionStorage.getItem('cartView'));
    let roshettaObj:object = JSON.parse(sessionStorage.getItem('roshettaDetails'));
    if (localStorage.getItem('role') == 'user' && (cartArr[0] || roshettaObj)) {
        return true;
    }else if(localStorage.getItem('role') != 'user') {
      this.router.navigate(["/sigIn"])
      return false;
    }else if(!(cartArr[0] || roshettaObj)){
      this.router.navigate(["/home"]);
      return false;
    }
  }
}
