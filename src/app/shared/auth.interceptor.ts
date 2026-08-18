import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AppConfigService } from '../app.config.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const apiUrl = AppConfigService.settings?.apiUrl;
    const token = sessionStorage.getItem('token');
    const isApiRequest = Boolean(apiUrl && request.url.startsWith(apiUrl));
    const isLoginRequest = request.url.endsWith('/auth/login');

    if (!token || !isApiRequest || isLoginRequest) {
      return next.handle(request);
    }

    return next.handle(request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    }));
  }
}
