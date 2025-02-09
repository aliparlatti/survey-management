import {Component, OnDestroy, OnInit} from '@angular/core';
import {SurveyManageComponent} from '../survey-manage/survey-manage.component';
import {Subject, takeUntil} from 'rxjs';
import {SurveysService} from '../../services/surveys.service';
import {ISurvey} from '../../models/surveys.interface';
import {ActivatedRoute} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-survey-update',
  imports: [
    SurveyManageComponent,
    NgIf
  ],
  templateUrl: './survey-update.component.html',
  styleUrl: './survey-update.component.scss'
})
export class SurveyUpdateComponent implements OnInit, OnDestroy {
  _unsubscribeAll: Subject<any> = new Subject<any>();
  survey:ISurvey
  constructor(private _surveysService: SurveysService,private activatedRoute: ActivatedRoute,) { }

  ngOnInit() {
  this._surveysService
    .get<ISurvey>('/' + this.activatedRoute.snapshot.paramMap.get('id'))
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(value => {
      this.survey=value
    })

  }

  ngOnDestroy() {
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }
}
