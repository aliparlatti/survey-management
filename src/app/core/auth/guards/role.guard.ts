import {Injectable} from '@angular/core';
import {AuthService} from '../auth.service';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ): boolean {
    const requiredRoles = route.data['role'];

    if (this.authService.user?.value?.role === requiredRoles) {
      return true;
    }

    this.router.navigate(['/unauthorized']);
    return false;
  }
}
