import { Component } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';

import { AppUser } from '../models/app-user';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(public auth: AuthService) {
  }

  logout() {
    this.auth.logout();
  }
}
