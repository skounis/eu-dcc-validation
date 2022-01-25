import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MockDataInterceptor } from '../interceptors/mock-data.interceptor';

export const environment = {
  production: true,
  maxAge: 3.6e+6, // 1 hour
  api: {
    base: 'https://some-domain.com/'
  },
  github: {
    endpoint: 'https://api.github.com/repos/eu-digital-green-certificates/dcc-quality-assurance/git/trees/main?recursive=1',
    // Enable basic authentication for GitHub
    // Increases the API calls limit
    // https://github.com/settings/tokens
    authenticate: false,
    user: 'fbcf454f29a701587efd',
    token: '86f7c6d2348f48c372f09129ea6cbddec8ad97ff'
  },
  providers: [
    // Provider for mock data
    { provide: HTTP_INTERCEPTORS, useClass: MockDataInterceptor, multi: true }
  ]
};
