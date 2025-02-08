import {Component } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {RouterLink, RouterOutlet} from '@angular/router';
import {Role} from '../../shared/models/user.interface';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-layout',
  templateUrl: 'layout.component.html',
  imports: [
    RouterOutlet,
    RouterLink,
    NgIf
  ],
  styles:`
    .navbar-toggler:focus,
    .navbar-toggler:active,
    .navbar-toggler-icon:focus {
      outline: none;
      box-shadow: none;
    }
    .user-name{
     font-size: 1rem;
    }
  `
})

export class LayoutComponent {
  protected readonly Role = Role;

  constructor(protected _authService: AuthService) {
  }
}
