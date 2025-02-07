import {Component } from '@angular/core';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: 'layout.component.html',
  imports:[],
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
  constructor(protected authService: AuthService) {
  }
}
