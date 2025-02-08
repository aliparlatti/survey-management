import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbPagination} from '@ng-bootstrap/ng-bootstrap';
import {BehaviorSubject, Subject, takeUntil} from 'rxjs';
import {IPageableInterface} from '../../../shared/models/pageable.interface';
import {IAnswer} from '../models/answer.model';
import {AnswersService} from '../services/answers.service';

@Component({
  selector: 'app-answers-list',
  imports: [
    NgbPagination
  ],
  templateUrl: './answers-list.component.html',
})

export class AnswersListComponent implements OnInit, OnDestroy {
  _unsubscribeAll: Subject<any> = new Subject<any>();
  answers$: BehaviorSubject<IAnswer[]> = new BehaviorSubject<IAnswer[]>([]);
  pageable:IPageableInterface={_page:1,_limit:10}
  constructor(private _answersService: AnswersService) {
  }

  ngOnInit() {
    this.loadData()
  }

  loadData() {
    this._answersService.get<IAnswer[]>(undefined, this.pageable).pipe(takeUntil(this._unsubscribeAll)).subscribe(answers => {
      this.answers$.next(answers);
    })
  }

  ngOnDestroy() {
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }
}
