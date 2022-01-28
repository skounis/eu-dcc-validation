import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, pipe, UnaryFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { RepositoryContent, RepositoryContentItem, RepositoryNode } from '../interfaces/github.interface';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StaticService {

  url = 'https://raw.githubusercontent.com/eu-digital-green-certificates/dcc-quality-assurance/validation6/qa.json'
  
  options = { 
    headers: { 
      "Accept": "application/vnd.github.v3+json",
    } 
  };

  constructor(private http: HttpClient) { }

  getTree(): Observable<RepositoryContentItem[]> {
    return this.http.get<RepositoryContentItem[]>(this.url, this.options);
  }
}
