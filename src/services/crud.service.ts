import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';

import { GithubService } from './github.service';
import { RepositoryContent } from '../interfaces/github.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient, private github: GithubService) { }

  getData(): Observable<RepositoryContent> {
    return this.github.getTree();
  }
}
