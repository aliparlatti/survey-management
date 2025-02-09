import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {ISurvey} from '../../models/surveys.interface';
import {SurveysService} from '../../services/surveys.service';
import {ActivatedRoute} from '@angular/router';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {NgForOf, NgIf, NgSwitch, NgSwitchCase} from '@angular/common';
import {AuthService} from '../../../../core/auth/auth.service';
import {AnswerForm} from '../../form/answer.form';
import {AnswersService} from '../../../answers/services/answers.service';
import {IAnswer} from '../../../answers/models/answer.model';
import {ToastService} from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-survey-details',
  imports: [
    ReactiveFormsModule,
    NgSwitch,
    NgSwitchCase,
    NgForOf,
    NgIf
  ],
  templateUrl: './survey-details.component.html',
  styleUrls: ['./survey-details.component.scss']
})
export class SurveyDetailsComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  survey: ISurvey;
  answerForm!: FormGroup;

  constructor(
    private _surveysService: SurveysService,
    private _answerService: AnswersService,
    private _authService: AuthService,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    const surveyId = this.activatedRoute.snapshot.paramMap.get('id');
    if (surveyId) {
      this._surveysService
        .get<ISurvey>(`/${surveyId}`)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(value => {
          this.survey = value;
          this.answerForm = AnswerForm.createForm(this.fb, this.survey, this._authService.user.value?.id);
        });
    }
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }

  get questionsFormArray(): FormArray {
    return this.answerForm.get('questions') as FormArray;
  }

  onSubmit(): void {
    if (this.answerForm.valid) {
      this._answerService.post<IAnswer>(this.answerForm.value)
        .pipe(takeUntil(this._unsubscribeAll)).subscribe(
        (value: IAnswer) => {
          this.toastService.show('Answered', {classname: 'bg-success text-light', delay: 4000});
          this.answerForm = AnswerForm.createForm(this.fb, this.survey, this._authService.user.value?.id);
        },
        error => {
          this.toastService.show(error, {classname: 'bg-danger text-light', delay: 4000});
        })
    } else {
      this.answerForm.markAllAsTouched();
    }
  }
}
