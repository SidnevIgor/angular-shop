import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AppUser } from '../models/app-user';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  appUser:AppUser = {
    name: '',
    email: '',
    isAdmin: true,
    password: ''
  };
  faLeaf = faLeaf;

  constructor(private auth: AuthService) { }
  
  login() {
    this.auth.login(this.appUser);
  }
  loginGoogle() {
    this.auth.loginGoogle();
  }
  loginFacebook() {
    this.auth.loginFacebook();
  }
}
