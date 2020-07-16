import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!this.authService.isAuthenticated()) {
        this.router.navigate(['/login']);
        return false;
      }

      const role = next.data.role as string;
      if (this.authService.hasRole(role)) {
        return true;
      }
      Swal.fire('Access denied', `${ this.authService.user.username } doesn't have permissions`, 'warning');
      this.router.navigate(['/cars']);
      return false;
  }

}
