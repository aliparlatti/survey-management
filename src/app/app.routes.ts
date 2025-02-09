import {Routes} from '@angular/router';
import {SignInComponent} from './core/auth/components/sign-in/sign-in.component';
import {AuthGuard} from './core/auth/guards/auth.guard';
import {NoAuthGuard} from './core/auth/guards/noAuth.guard';
import {UnauthorizedComponent} from './core/auth/components/unauthorized/unauthorized.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./core/layout/layout.routes'),
  },
  {path: '', pathMatch: 'full', redirectTo: 'surveys'},
  {
    path: 'signed-in-redirect',
    pathMatch: 'full',
    redirectTo: 'surveys',
  },
  {
    path: 'sign-in',
    canActivate: [NoAuthGuard],
    component: SignInComponent,
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
  }
];

export default routes;
