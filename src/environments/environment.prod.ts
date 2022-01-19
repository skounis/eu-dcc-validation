import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MockDataInterceptor } from '../interceptors/mock-data.interceptor';

export const environment = {
  production: true,
  api: {
    base: 'https://some-domain.com/'
  },
  providers: [
    // Provider for mock data
    { provide: HTTP_INTERCEPTORS, useClass: MockDataInterceptor, multi: true }
  ]
};
