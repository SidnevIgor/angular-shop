import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route,state: RouterStateSnapshot): boolean {
  this.auth.user$.subscribe(user => {
      if(user) {
        return true;
      }
      else {
        this.router.navigate(['/login'],{ queryParams: {returnUrl: state.url}});
        return false;
      }
    });
    return true;
  }
}
