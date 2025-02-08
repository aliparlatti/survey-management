import {Routes} from '@angular/router';
import {SignInComponent} from './core/auth/components/sign-in/sign-in.component';
import {AuthGuard} from './core/auth/guards/auth.guard';
import {NoAuthGuard} from './core/auth/guards/noAuth.guard';

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
    path: '',
    canActivate: [NoAuthGuard],
    children: [
      {
        path: 'sign-in',
        component: SignInComponent,
      },
    ],
  },
];

export default routes;
