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
    isAdmin: true
  };
  constructor(private auth: AuthService) { }
  login() {
    console.log(this.appUser);
    this.auth.login(this.appUser);
  }
  loginGoogle() {
    this.auth.loginGoogle();
  }
}
