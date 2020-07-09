import { Component, OnInit } from '@angular/core';
import { User } from './user';
import Swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;

  constructor(private authService: AuthService, private router: Router) {
    this.user =  new User();
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      Swal.fire('Login', `${ this.authService.user.username }, you are already authenticated.`, 'info');
      this.router.navigate(['/cars']);
    }
  }

  login(): void {
    if (this.user.username == null || this.user.password == null) {
      Swal.fire('Error Login', 'User/Password cannot be null', 'error');
      return;
    }

    this.authService.login(this.user).subscribe( response => {
      this.authService.saveUser(response.access_token);
      this.authService.saveToken(response.access_token);

      const user = this.authService.user;

      this.router.navigate(['/cars']);
      Swal.fire('Login', `Hi ${ user.username }`, 'success');
    }, err => {
      if (err.status === 400) {
        Swal.fire('Error Login', 'Username or password incorrect', 'error');
      }
    });
  }

}
