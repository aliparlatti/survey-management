import {Routes} from '@angular/router';
import {SurveysComponent} from './surveys.component';
import {SurveysListComponent} from './components/surveys-list/surveys-list.component';
import {RoleGuard} from '../../core/auth/guards/role.guard';
import {Role} from '../../shared/models/user.interface';
import {SurveyCreateComponent} from './components/survey-create/survey-create.component';
import {SurveyUpdateComponent} from './components/survey-update/survey-update.component';
import {SurveyDetailsComponent} from './components/survey-details/survey-details.component';

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
        path: 'create',
        component: SurveyCreateComponent,
        canActivate: [RoleGuard],
        data: {role: Role.Admin},
      },
      {
        path: 'update/:id',
        component: SurveyUpdateComponent,
        canActivate: [RoleGuard],
        data: {role: Role.Admin},
      },
      {
        path: 'detail/:id',
        component: SurveyDetailsComponent,
        canActivate: [RoleGuard],
        data: {role: Role.User},
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
