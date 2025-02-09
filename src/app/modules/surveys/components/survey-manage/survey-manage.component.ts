import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, ReactiveFormsModule} from '@angular/forms';
import {SurveyForm} from '../../form/survey.form';
import {NgForOf, NgIf} from '@angular/common';
import {SurveysService} from '../../services/surveys.service';
import {ISurvey} from '../../models/surveys.interface';
import {Subject, takeUntil} from 'rxjs';
import {ToastService} from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-survey-manage',
  templateUrl: './survey-manage.component.html',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf,
  ],
  styleUrls: ['./survey-manage.component.scss']
})
export class SurveyManageComponent implements OnInit, OnDestroy {
  _unsubscribeAll: Subject<any> = new Subject<any>();
  surveyForm: FormGroup;
  @Input({required: false}) survey: ISurvey|null;

  constructor(private fb: FormBuilder, private _surveysService: SurveysService, private toastService: ToastService,) {
  }

  ngOnInit(): void {
    this.surveyForm = SurveyForm.createForm(this.fb);
    if (this.survey?.id) {
      const questionsControl = this.surveyForm.get('questions') as FormArray;
      if (this.survey.questions && this.survey.questions.length) {
        this.survey.questions.forEach(question => {
          const questionControl = SurveyForm.createQuestion(this.fb);
          questionControl.patchValue({
            text: question.text,
            type: question.type
          });
          if (question.type === 'select' && question.options && question.options.length) {
            const optionsControl = questionControl.get('options') as FormArray;
            question.options.forEach(option => {
              const optionControl = SurveyForm.createOption(this.fb);
              optionControl.patchValue({text: option.text});
              optionsControl.push(optionControl);
            });
          }
          questionsControl.push(questionControl);
        });
      }
      this.surveyForm.patchValue({title: this.survey.title});
    } else {
      this.addQuestion();
    }
  }

  get questions(): FormArray {
    return this.surveyForm.get('questions') as FormArray;
  }

  addQuestion(): void {
    this.questions.push(SurveyForm.createQuestion(this.fb));
  }

  removeQuestion(index: number): void {
    this.questions.removeAt(index);
  }

  getOptions(questionIndex: number): FormArray {
    return this.questions.at(questionIndex).get('options') as FormArray;
  }

  addOption(questionIndex: number): void {
    this.getOptions(questionIndex).push(SurveyForm.createOption(this.fb));
  }

  removeOption(questionIndex: number, optionIndex: number): void {
    this.getOptions(questionIndex).removeAt(optionIndex);
  }

  onSubmit(): void {
    if (this.surveyForm.valid) {
      if (this.survey?.id) {
        this._surveysService.patch<ISurvey>(this.survey.id, this.surveyForm.value)
          .pipe(takeUntil(this._unsubscribeAll)).subscribe(
          (value: ISurvey) => {
            this.toastService.show('Updated ' + value.title, {classname: 'bg-success text-light', delay: 4000});
          },
          error => {
            this.toastService.show(error, {classname: 'bg-danger text-light', delay: 4000});
          })
      } else {
        this._surveysService.post<ISurvey>(this.surveyForm.value)
          .pipe(takeUntil(this._unsubscribeAll)).subscribe(
          (value: ISurvey) => {
            this.toastService.show('Created ' + value.title, {classname: 'bg-success text-light', delay: 4000});
            this.surveyForm = SurveyForm.createForm(this.fb);
            this.addQuestion()
          },
          error => {
            this.toastService.show(error, {classname: 'bg-danger text-light', delay: 4000});
          })
      }
    } else {
      this.surveyForm.markAllAsTouched();
    }
  }

  ngOnDestroy() {
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }
}
