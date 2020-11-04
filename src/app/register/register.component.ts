import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AppUser } from '../models/app-user';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  appUser:AppUser = {
    name: '',
    email: '',
    isAdmin: false,
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
  register() {
    this.auth.register(this.appUser);
  }
}
