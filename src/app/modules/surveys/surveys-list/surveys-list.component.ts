import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbPagination} from '@ng-bootstrap/ng-bootstrap';
import {SurveysService} from '../services/surveys.service';
import {ISurvey} from '../models/surveys.interface';
import {BehaviorSubject, Subject, takeUntil} from 'rxjs';
import {IPageableInterface} from '../models/pageable.interface';

@Component({
  selector: 'app-surveys-list',
  imports: [
    NgbPagination
  ],
  templateUrl: './surveys-list.component.html',
})

export class SurveysListComponent implements OnInit, OnDestroy {
  _unsubscribeAll: Subject<any> = new Subject<any>();
  surveys$: BehaviorSubject<ISurvey[]> = new BehaviorSubject<ISurvey[]>([]);
  pageable:IPageableInterface={_page:1,_limit:10}
  constructor(private _surveysService: SurveysService) {
  }

  ngOnInit() {
    this.loadData()
  }

  loadData() {
    this._surveysService.get<ISurvey[]>(undefined, this.pageable).pipe(takeUntil(this._unsubscribeAll)).subscribe(surveys => {
      this.surveys$.next(surveys);
    })
  }

  ngOnDestroy() {
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }
}
