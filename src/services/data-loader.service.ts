import { Injectable } from '@angular/core';

import { AppStore } from '../stores/app.store';
import { CrudService } from '../services/crud.service';
import * as _ from 'lodash';

@Injectable()
export class DataLoaderService {

  constructor(private store: AppStore,
    private crud: CrudService) {

  }

  load(): Promise<any> {
    return new Promise<void>((resolve, reject) => {
      this.crud.getData()
        .subscribe({
          next: (res: any) => {
            console.log('Response of getting the data:', res);
            // Stump 
            // Remove sample records for testing the the sanitazation
            // const ids = ['LU/1.3.0/TEST_RAT.png', 'LU/1.3.0/TEST_NAAT.png'];
            // _.remove(res.tree, (e: { path: string; }) => {
            //   return ids.includes(e.path);
            // });
            this.store.setData(res);
            resolve();
          },
          error: (err) => {
            console.log('Error while getting the data: ', err);
            reject();
          }
        });
    });
  }
}
