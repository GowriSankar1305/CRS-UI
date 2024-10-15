import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('------ intercepting request--------');
  const storageService = inject(StorageService);
  const router = inject(Router);
  req = req.clone({
    setHeaders: {
      'Authorization': storageService.fetchItem('TOKEN')
    }
  });
  return next(req).pipe(
    catchError((error : HttpErrorResponse) => {
      if(error.status === 401)  {
        storageService.clearLocalStorage();
        router.navigate(['/admin/login']);
      }
      return throwError(() => error);
    })
  );};
