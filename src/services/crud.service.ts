import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';

import { GithubService } from './github.service';
import { StaticService } from './static.service';

import { RepositoryContent, RepositoryContentItem } from '../interfaces/github.interface';
import { Observable, forkJoin, map  } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient, private github: GithubService, private compiled: StaticService) { }

  getData(): Observable<RepositoryContent> {
    return this.merge();
    // return this.one();  
  }

  private one(): Observable<RepositoryContent> {
    return this.github.getTree();  
  }

  private merge(): Observable<any>{
    // https://coryrylan.com/blog/angular-multiple-http-requests-with-rxjs
    const calls = [
      this.github.getTree(),
      this.compiled.getTree(),
    ]
    
    return forkJoin(calls).pipe(
      map((item) => {
        (<RepositoryContent> item[0]).tree = (<RepositoryContentItem[]> item[1]);
        return item[0];
      })
    )
    
  }
}
