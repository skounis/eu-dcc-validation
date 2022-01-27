import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { now } from 'lodash';
import { environment } from '../environments/environment';

@Injectable()
export class CacheDataInterceptor implements HttpInterceptor {
  //
  // TODO: Get inspired and improve 
  // https://github.com/schuchard/ng-interceptors/blob/master/src/app/cache/cache.service.ts
  //

  /**
   * Match the tree URL
   * eg "https://api.github.com/repos/eu-digital-green-certificates/dcc-quality-assurance/git/trees/main?recursive=1"
   */
  private treeURL = 'https://api.github.com/repos/eu-digital-green-certificates/dcc-quality-assurance/git/trees/main'
  /**
   * Match the imageURL
   * eg https://api.github.com/repos/eu-digital-green-certificates/dcc-quality-assurance/git/blobs/07984193650c3aa1a3f4ad16208cf7829f833b0c
   */
  private imageURL = 'https://api.github.com/repos/eu-digital-green-certificates/dcc-quality-assurance/git/blobs/';

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.match('/data') && request.method === 'GET') {
      request = request.clone({
        url: '../assets/data.json'
      });
    } else if (request.url.match(this.imageURL) && request.method === 'GET') {
      // Return cached image data if exist
      const data = this.load(request.url);
      if (!!data) {
        return of(new HttpResponse({body: data.body}))
      }
    } else if (request.url.match(this.treeURL) && request.method === 'GET') {
      // Return cached tree data if exist
      const data = this.load(request.url);
      if (!!data) {
        return of(new HttpResponse({body: data.body}))
      }
    }

    return next.handle(request)
      .pipe(map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // Capture the response and store it locally.
          // this.capture(event);
        }
        return event;
      }));
  }

  /**
   * Capture in local storage.
   * 
   * @param event HttpResponse 
   * @returns 
   */
  private capture(event: HttpResponse<any>) {
    if (!event.url) return;
    const key = btoa(event.url);
    const value = {
      timestamp: now(),
      url: event.url,
      body: event.body,
    }
    localStorage.setItem(key, JSON.stringify(value, null, 2));
    console.log('Keep in local storage:', key, value);
  }

  /**
   * Load from local storage.
   * 
   * @param url Request URL
   * @returns Stored response including the `.body`.
   */
  private load(url: string) {
    const onehour = environment.maxAge || 3.6e+6; // Max age from env or 1 hour.
    const key = btoa(url);
    const json = localStorage.getItem(key);

    try {
      const value = !!json ? JSON.parse(json) : null;
      // If data exists with age less that 1 hour return them from local storage.
      if (!!value && !!value.timestamp && value.timestamp + onehour > now()) {
        console.log('API request: Return from local storage:', value)
        return value;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    } 
  }
}
