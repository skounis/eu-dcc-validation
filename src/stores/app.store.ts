import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { IQRCode, IScanResult } from '../interfaces/qr-code.interface';
import { LocalStorageService } from '../services/local-storage.service';
import { RepositoryContent } from '../interfaces/github.interface';

import { GithubService } from '../services/github.service';

@Injectable()
export class AppStore {

  private results: IScanResult[] = [];

  public raw: RepositoryContent | null = null;
  public data = new BehaviorSubject<IQRCode[]>([]);
  public selectedQr = new BehaviorSubject<IQRCode | null>(null);

  constructor(private localStorage: LocalStorageService, private github: GithubService) {
  }

  load() {
    // TODO: Bring the load() function of DataLoaderService and remove the DataLoaderService.
    // After getting the data form remote source call the setData(data) function of this class.
    // And then call setSelectedQr(value) to set the selected QR as the first one from the
    // returned data.
  }

  getData(): IQRCode[] {
    return this.data.value;
  }

  setData(data: RepositoryContent) {
    const COUNTRY = 0;
    const VERSION = 1;
    const FILE = 2;
    this.raw = data;
    const mapped = data.tree.map((i): IQRCode => {
      const parts = i.path.split('/');
      return { country: parts[COUNTRY], title: i.path, version: parts[VERSION], file: parts[FILE], qrcode: i.url }
    });
    this.data.next(mapped);
    this.setSelectedQr(mapped[0])
  }

  flushData() {
    this.data.next([]);
  }

  getSelectedQr(): IQRCode | null {
    return this.selectedQr.value;
  }

  setSelectedQr(value: IQRCode) {
    this.github.getImage(value.qrcode).subscribe((item: any) => {
      value.qrcode64 = item;
      this.selectedQr.next(value);
    });

  }

  flushSelectedQr() {
    this.selectedQr.next(null);
  }

  /**
   * Move the to previous item.
   */
  previous() {
    const index = this.index() - 1;
    if (index >= 0) {
      this.setSelectedQr(this.data.value[index]);
    } else {
      console.warn('Store: Start of the array reached.')
    }
  }

  /**
   * Move the to next item.
   */
  next() {
    const index = this.index() + 1;
    if (index < this.data.value.length) {
      this.setSelectedQr(this.data.value[index]);
    } else {
      console.warn('Store: End of the array reached.')
    }
  }

  /**
   * Capture the submitted results
   */
  capture(result: IScanResult) {
    console.log('Store: Capture the scan result: ', result)
    this.results.push(result);
    this.serialize();
  }

  private serialize() {
    this.localStorage.setItem(LocalStorageService.SCAN_RESULT_KEY, this.results);
  }

  private deserialize() {
    this.localStorage.removeItem(LocalStorageService.SCAN_RESULT_KEY);
  }

  /**
   * The current index
   */
  private index() {
    const index = this.data.value.findIndex(i => {
      return i.title === this.selectedQr.value?.title
    })
    return index;
  }
}
