import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, pipe, UnaryFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { RepositoryContent, RepositoryContentItem, RepositoryNode } from '../interfaces/github.interface';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private endpoint = environment.github.endpoint;
  private user = environment.github.user;
  private token = environment.github.token;
  private authentication = "Basic " + btoa(`${this.user}:${this.token}`)

  githubApiUrl = this.endpoint;

  githubOptions = { 
    headers: { 
      "Accept": "application/vnd.github.v3+json",
      "Authorization": this.authentication
    } 
  };


  constructor(private http: HttpClient) {
  }

  getTree(): Observable<RepositoryContent> {
    let imageFilter = pipe(
      map((item: RepositoryContent) => {
        item.tree = item.tree.filter(x => x.path && x.path.slice(-3).toLowerCase() === "png");
        return item;
      })
    );

    return imageFilter(this.http.get<RepositoryContent>(this.githubApiUrl, this.githubOptions));
  }

  getImage(url: string): Observable<any> {
    let imageFilter = pipe(
      map((item: RepositoryNode) => item.content)
    );
    return imageFilter(this.http.get<RepositoryNode>(url, this.githubOptions));
  }

  // !! Usage example !!
  // TODO: put this in a test
  // console.log("Calling service");
  // service.getTree().subscribe((result) => {
  //   console.log("Result received!");
  //   console.log(JSON.stringify(result));
  //   service.getImage(result.tree[0].url).subscribe((x) => {
  //     console.log("Image received!");
  //     console.log(JSON.stringify(x));
  //   })
  // });
}
