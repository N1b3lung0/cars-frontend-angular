import { Component, OnInit } from '@angular/core';
import { User } from './user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;

  constructor() {
    this.user =  new User();
  }

  ngOnInit(): void {
  }

  login(): void {
    if (this.user.username == null || this.user.password == null) {
      Swal.fire('Error Login', 'User/Password cannot be null', 'error');
      return;
    }
  }

}
