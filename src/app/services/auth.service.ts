import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(private auth: AngularFireAuth, private route: ActivatedRoute, private db: AngularFireDatabase, private router: Router) {
    this.user$ = auth.authState;
  }
  loginFacebook() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl',returnUrl);
    this.auth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then((val)=>{
      this.router.navigate(['products']);
    });
  }
  loginGoogle() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl',returnUrl);
    this.auth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
  login(appUser) {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl',returnUrl);
    return this.auth.auth.signInWithEmailAndPassword(appUser.email, appUser.password);
  }
  register(appUser) {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl',returnUrl);
    return this.auth.auth.createUserWithEmailAndPassword(appUser.email, appUser.password)
    .then(val => {
      return val.user.updateProfile({
        displayName: appUser.name
      })
    });
  }
  logout() {
    this.auth.auth.signOut();
  }
}
