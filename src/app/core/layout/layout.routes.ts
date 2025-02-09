import {Routes} from '@angular/router';
import {LayoutComponent} from './layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'surveys',
        loadChildren: () => import('../../modules/surveys/surveys.routes'),
      },
      {
        path: 'answers',
        loadChildren: () => import('../../modules/answers/answers.routes'),
      },
      {
        path: '',
        redirectTo: 'surveys',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/surveys',
    pathMatch: 'full',
  },
];

export default routes;
