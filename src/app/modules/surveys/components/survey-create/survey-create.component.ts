import { Component } from '@angular/core';
import {SurveyManageComponent} from '../survey-manage/survey-manage.component';

@Component({
  selector: 'app-survey-create',
  imports: [
    SurveyManageComponent
  ],
  templateUrl: './survey-create.component.html',
  styleUrl: './survey-create.component.scss'
})
export class SurveyCreateComponent {

}
