import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let header: any;
    let clone: any;
    if ((req.url.includes(environment.apiHost)) && (!req.url.includes('JWTServlet'))) {
      // Si le header est déja rempli, on ne le modifie pas
      if (req.headers.get('Content-Type') === 'text/plain') {
        header = {
          'Content-Type': 'text/plain',
          'Authorization': 'JWT ' + sessionStorage.getItem('token'),
          'Access-Control-Allow-Origin':'*'
        };
      } else {
        header = {
          'Content-Type': 'application/json',
          'Authorization': 'JWT ' + sessionStorage.getItem('token'),
          'Access-Control-Allow-Origin':'*'
        };
      }
      clone = req.clone({ setHeaders: header });
    } else {
      clone = req.clone();
    }
    return next.handle(clone);
  }
}
