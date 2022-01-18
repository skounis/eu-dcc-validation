import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IQrCode } from '../../interfaces/qr-code.interface';
import { AppStore } from '../../stores/app.store';

@Component({
  selector: 'selected-qr',
  templateUrl: './selected-qr.component.html'
})

export class SelectedQrComponent {

  item: IQrCode|null;

  constructor(private store: AppStore) {
    this.item = null;
    this.store.selectedQr.subscribe((selectedQr: IQrCode|null)  => {
      this.item = selectedQr;
    });
  }
}
