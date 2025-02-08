import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

export class SurveyForm {
  static createForm(fb: FormBuilder): FormGroup {
    return fb.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(250)]],
      questions: fb.array([])
    });
  }

  static createQuestion(fb: FormBuilder): FormGroup {
    return fb.group({
      text: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(300)]],
      type: ['text', Validators.required],
      options: fb.array([])
    }, { validators: SurveyForm.selectOptionsValidator });
  }

  static createOption(fb: FormBuilder): FormGroup {
    return fb.group({
      text: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
    });
  }

  static selectOptionsValidator(group: AbstractControl): ValidationErrors | null {
    const type = group.get('type')?.value;
    const options = group.get('options') as FormArray;
    if (type === 'select' && options.length < 2) {
      return { insufficientOptions: true };
    }
    return null;
  }
}
