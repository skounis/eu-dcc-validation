import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IQRCode, TestResultEnum } from '../../interfaces/model.interface';
import { AppStore } from '../../stores/app.store';

@Component({
  selector: 'app-dccqr',
  templateUrl: './dccqr.component.html',
  styleUrls: ['./dccqr.component.css']
})
export class DCCQRComponent implements OnInit {

  item: IQRCode | null;
  imagePath: SafeResourceUrl | null = null;

  constructor(private store: AppStore, private sanitizer: DomSanitizer) {
    this.item = null;
    this.store.getSelected().subscribe((selectedQr: IQRCode | null) => {
      this.item = selectedQr;
      this.imagePath = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
        + selectedQr?.qrcode64);
      console.log('DCCQRComponent: Selected: ', this.item)
    });
  }

  ngOnInit(): void {
  }

  previous() {
    console.log('DCCQRComponent: Display the previous QR code.')
    this.store.previous();
  }

  next() {
    console.log('DCCQRComponent: Display the next QR code.')
    this.store.next();
  }

  // TODO: move them in a common place.
  icon(id: string) {
    const item = this.store.find(id);
    switch (item?.result) {
      case TestResultEnum.Valid:
        return 'done';
      case TestResultEnum.Invalid:
        return 'report_problem'
      case TestResultEnum.Error:
        return 'error'
      default:
        return 'qr_code'
    }
  }

}
