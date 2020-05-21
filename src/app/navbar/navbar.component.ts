import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  user$: Observable<firebase.User>;
  constructor(private auth: AngularFireAuth) {
    this.user$ = auth.authState;
  }

  logout() {
    this.auth.auth.signOut();
  }
}
