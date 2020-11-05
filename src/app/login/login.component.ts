import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AppUser } from '../models/app-user';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  appUser:AppUser = {
    name: '',
    email: '',
    isAdmin: false,
    password: ''
  };
  faLeaf = faLeaf;

  constructor(private auth: AuthService) { }

  login() {
    this.auth.login(this.appUser).catch((error) => {
      console.log(error);
      if(error.code === "auth/wrong-password") {
        Swal.fire('Error', 'The password is wrong', 'error');
      }
      else {
        Swal.fire('Error', 'The user is not found', 'error');
      }
    });
  }
  loginGoogle() {
    this.auth.loginGoogle();
  }
  loginFacebook() {
    this.auth.loginFacebook();
  }
}
