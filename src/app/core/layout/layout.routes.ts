import {Routes} from '@angular/router';
import {LayoutComponent} from './layout.component';

export const routes: Routes = [
  {
    path: 'home',
    component: LayoutComponent,
    children: [
      // {
      //   path: '',
      //   loadChildren: () => import('../../home/home.routes'),
      // },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];

export default routes;
