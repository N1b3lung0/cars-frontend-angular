import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../users/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    const username = this.authService.user.username;
    this.authService.logout();
    Swal.fire('Logout', `${ username } logout`, 'success');
    this.router.navigate(['/cars']);
  }

}
