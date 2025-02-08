import {Routes} from '@angular/router';
import {AnswersComponent} from './answers.component';
import {AnswersListComponent} from './answers-list/answers-list.component';
import {RoleGuard} from '../../core/auth/guards/role.guard';
import {Role} from '../../shared/models/user.interface';

export const routes: Routes = [
  {
    path: '',
    component: AnswersComponent,
    children: [
      {
        path: '',
        component: AnswersListComponent,
        canActivate: [RoleGuard],
        data: { role: Role.Admin }
      },
      {
        path: '',
        redirectTo: 'answers',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/answers',
    pathMatch: 'full',
  },
];

export default routes;
