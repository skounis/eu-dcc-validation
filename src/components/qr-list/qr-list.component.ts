import { Component } from '@angular/core';
import { IQRCode  } from '../../interfaces/model.interface';
import { AppStore } from '../../stores/app.store';

@Component({
  selector: 'qr-list',
  templateUrl: './qr-list.component.html'
})

export class QrListComponent {

  data: IQRCode[];

  constructor(private store: AppStore) {
    this.data = [];
    this.store.data.subscribe((data: IQRCode[]) => {
      this.data = data;
    });
  }

  public selectQr(item: any) {
    this.store.setSelectedQr(item);
  }
}
