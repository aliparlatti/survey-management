import {Routes} from '@angular/router';
import {SurveysComponent} from './surveys.component';
import {SurveysListComponent} from './surveys-list/surveys-list.component';

export const routes: Routes = [
  {
    path: '',
    component: SurveysComponent,
    children: [
      {
        path: '',
        component: SurveysListComponent,
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
