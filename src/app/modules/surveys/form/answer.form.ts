import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import {ISurvey} from '../models/surveys.interface';

export class AnswerForm {
  static createForm(fb: FormBuilder, survey: ISurvey, userId: number = 5): FormGroup {
    const form = fb.group({
      user_id: [userId, Validators.required],
      survey_id: [survey.id, Validators.required],
      questions: fb.array([])
    });

    survey.questions?.forEach((q, index) => {
      (form.get('questions') as FormArray).push(
        fb.group({
          id: [index],
          answer: ['', Validators.required]
        })
      );
    });

    return form;
  }
}
