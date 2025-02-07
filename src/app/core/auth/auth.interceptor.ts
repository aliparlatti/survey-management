import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {AuthService} from "./auth.service";
import {AuthUtils} from "./auth.utils";

export const authInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  let newReq = req.clone();


  if (authService.accessToken && !AuthUtils.isTokenExpired(authService.accessToken)) {
    newReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authService.accessToken),
    });
  }

  return next(newReq).pipe(
    catchError(error => {
      if (error instanceof HttpErrorResponse) {
        switch (error.status) {
          case 401:
            authService.signOut();
            location.reload();
            break;
          case 500:
            alert(error.error || error.message);
            break;
          default:
            break;
        }
      }
      return throwError(error);
    })
  );
};
