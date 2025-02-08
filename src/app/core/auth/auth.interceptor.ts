import {HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {inject} from '@angular/core';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthService} from "./auth.service";
import {AuthUtils} from "./auth.utils";
import {ToastService} from '../../shared/services/toast.service';

export const authInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const toastService = inject(ToastService);

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
            toastService.show(error.message, {classname: 'bg-danger text-light', delay: 4000});
            break;
          default:
            break;
        }
      }
      return throwError(error);
    })
  );
};
