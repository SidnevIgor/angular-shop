import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  user: firebase.User;
  constructor(private auth: AngularFireAuth) {
    auth.authState.subscribe(user => this.user=user);
  }

  logout() {
    this.auth.auth.signOut();
  }
}
