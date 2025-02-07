import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass} from '@angular/common';
import {AuthService} from '../../auth.service';
import {Subject, takeUntil} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  imports: [
    NgClass,
    ReactiveFormsModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnDestroy {
  _unsubscribeAll: Subject<any> = new Subject<any>();
  loginForm: FormGroup;

  constructor(private router: Router,private fb: FormBuilder, private authService: AuthService,) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService
        .signIn(this.loginForm.value)
        .pipe(
          takeUntil(this._unsubscribeAll),
        )
        .subscribe({
          next: (value) => {
            if (value) {
              this.router.navigate(['home']);
            }
          },
        });
    } else {
      return
    }
  }
  ngOnDestroy() {
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }
}
