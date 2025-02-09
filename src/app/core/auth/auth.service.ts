import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {BehaviorSubject, catchError, Observable, of, tap, throwError} from 'rxjs';
import { AuthUtils } from "./auth.utils";
import { Router } from "@angular/router";
import {environment} from '../../../environments/environment';
import {IUser} from '../../shared/models/user.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _authenticated = false;
  private _router = inject(Router);
  private _httpClient = inject(HttpClient);
  private apiBaseUrl = environment.apiBaseUrl;
  public user: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null);

  constructor() {}

  set accessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  get accessToken(): string {
    return localStorage.getItem('accessToken') ?? '';
  }

  signIn(user:{email:string;password: string}): Observable<any> {
    if (this._authenticated) {
      return throwError('User is already logged in.');
    }

    return this._httpClient.post(`${this.apiBaseUrl}/login`,  user ).pipe(
      tap((response: any) => {
        this.accessToken = response.accessToken;
        this.user.next(response.user)
        this._authenticated = true;
      })
    );
  }

  signInUsingToken(): Observable<any> {
    return this._httpClient.get(`${this.apiBaseUrl}/me`)
      .pipe(
        tap((response: any) => {
          this.user.next(response)
          this._authenticated = true;
        }),
        catchError(() => {
          return of(false);
        })
      );
  }

  signOut(): Observable<any> {
    localStorage.removeItem('accessToken');
    this._authenticated = false;
    this._router.navigate(['sign-in']);
    return of(true);
  }

  check(): Observable<boolean> {
    if (this._authenticated) {
      return of(true);
    }

    if (!this.accessToken || AuthUtils.isTokenExpired(this.accessToken)) {
      return of(false);
    }

    return this.signInUsingToken();
  }
}
