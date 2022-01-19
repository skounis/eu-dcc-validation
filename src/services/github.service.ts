import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, pipe, UnaryFunction } from 'rxjs';
import { map } from 'rxjs/operators';

export interface RepositoryContent {
  sha: string;
  url: string;
  tree: Array<RepositoryContentItem>;
  truncated: boolean;
}

export interface RepositoryContentItem {
  path: string;
  mode: string;
  type: string;
  size: number;
  url: string;
}

export interface RepositoryNode {
  sha: string;
  node_id: string;
  size: number;
  content: string;
  encoding: string;
}

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  // TODO: move to a config and inject
  githubApiUrl = "https://api.github.com/repos/eu-digital-green-certificates/dcc-quality-assurance/git/trees/main?recursive=1";

  githubOptions = { headers: { "Accept": "application/vnd.github.v3+json" } };

  constructor(private http: HttpClient) {
  }
  
  getTree() {
    let imageFilter = pipe(
      map((item: RepositoryContent) => {     
        item.tree = item.tree.filter(x => x.path && x.path.slice(-3).toLowerCase() === "png");
        return item;
      })
    );

    return imageFilter(this.http.get<RepositoryContent>(this.githubApiUrl, this.githubOptions));
  }

  getImage(url: string) {
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
