import { Injectable } from '@angular/core';

import { AppStore } from '../stores/app.store';
import { CrudService } from '../services/crud.service';

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
