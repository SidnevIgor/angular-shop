import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AppUser } from '../models/app-user';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

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

  loginGoogle() {
    this.auth.loginGoogle();
  }
  loginFacebook() {
    this.auth.loginFacebook();
  }
  register() {
    this.auth.register(this.appUser).catch((error) => {
      console.log(error);
      if(error.code === "auth/email-already-in-use") {
        Swal.fire('Error', 'The email is already used', 'error');
      }
    });
  }
}
