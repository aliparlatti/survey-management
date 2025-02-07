import {Routes} from '@angular/router';
import {SignInComponent} from './core/auth/components/sign-in/sign-in.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./core/layout/layout.routes'),
  },
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {
    path: 'signed-in-redirect',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: '',
    children: [
      {
        path: 'sign-in',
        component: SignInComponent,
      },
    ],
  },
];

export default routes;
