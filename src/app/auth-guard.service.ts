import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate() {
    this.auth.user$.subscribe(user => {
      if(user) {
        return true;
      }
      else {
        this.router.navigate(['/login']);
        return false;
      }
    });
  }
}
