import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MockDataInterceptor } from '../interceptors/mock-data.interceptor';

export const environment = {
  production: true,
  api: {
    base: 'https://some-domain.com/'
  },
  github: {
    endpoint: 'https://api.github.com/repos/eu-digital-green-certificates/dcc-quality-assurance/git/trees/main?recursive=1',
    // Enable basic authentication for GitHub
    // Increases the API calls limit
    // https://github.com/settings/tokens
    authenticate: false,
    user: 'USERNAME',
    token: 'PERSONAL_ACCESS_TOKEN'
  },
  providers: [
    // Provider for mock data
    { provide: HTTP_INTERCEPTORS, useClass: MockDataInterceptor, multi: true }
  ]
};
