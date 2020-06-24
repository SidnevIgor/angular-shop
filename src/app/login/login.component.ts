import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  appUser:AppUser = {
    name: '',
    email: '',
    isAdmin: false
  };
  constructor(private auth: AuthService) { }
  login() {
    this.auth.login();
  }
}
