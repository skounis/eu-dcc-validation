import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';
import { IQRCode, TestResult, ITestResultEntry } from '../interfaces/model.interface';
import { LocalStorageService } from '../services/local-storage.service';
import { RepositoryContent } from '../interfaces/github.interface';

import { GithubService } from '../services/github.service';

@Injectable()
export class AppStore {

  private results = new TestResult();
  private raw: RepositoryContent | null = null;
  private data = new BehaviorSubject<IQRCode[]>([]);
  private selected = new BehaviorSubject<IQRCode | null>(null);
  private message = new BehaviorSubject<string>('');

  constructor(private localStorage: LocalStorageService, private github: GithubService) {
  }

  load() {
    // TODO: Bring the load() function of DataLoaderService and remove the DataLoaderService.
    // After getting the data form remote source call the setData(data) function of this class.
    // And then call setSelectedQr(value) to set the selected QR as the first one from the
    // returned data.
  }

  /**
   * @returns The raw API response
   */
  getRaw(): RepositoryContent | null {
    return this.raw;
  }
  /**
   * The data mapped a collection of `IQCode`s
   * @returns Q
   */
  getData(): BehaviorSubject<IQRCode[]> {
    return this.data;
  }

  setData(data: RepositoryContent) {
    const COUNTRY = 0;
    const VERSION = 1;
    const FILE = 2;
    this.raw = data;
    const mapped = data.tree.map((i): IQRCode => {
      const parts = i.path.split('/');
      return { id: i.path, country: parts[COUNTRY], title: i.path, version: parts[VERSION], file: parts[FILE], uri: i.url }
    });
    this.data.next(mapped);
    this.setSelected(mapped[0])
  }

  flushData() {
    this.data.next([]);
  }

  /**
   * Get the selected QR Code
   * @returns The value `IQRCode` of the selected QR code
   */
  getSelected(): BehaviorSubject<IQRCode | null> {
    return this.selected;
  }

  /**
   * Update/Set the selected QR Code.
   * 
   * Resolves the QR Code by loading its Base64 image. Updates the 
   * selected QR Code and broadcasts it.
   * @param value The QR Code
   */
  setSelected(value: IQRCode) {
    this.github.getImage(value.uri).subscribe((item: any) => {
      value.qrcode64 = item;
      this.selected.next(value);
    });
  }

  /**
   * Get the last message broadcasted.
   * 
   * @returns 
   */
  getMessage(): BehaviorSubject<string> {
    return this.message;
  }

  /**
   * Broadcast a message
   * @param value The message
   */
  setMessage(value: string) {
    this.message.next(value);
  }

  /**
   * Flush the selected/current QR code
   * // TODO: Review again
   */
  flushSelectedQr() {
    this.selected.next(null);
  }

  /**
   * Move the to previous item/QR Code.
   */
  previous() {
    const index = this.index() - 1;
    if (index >= 0) {
      this.setSelected(this.data.value[index]);
    } else {
      console.warn('Store: Start of the array reached.')
    }
  }

  /**
   * Move the to next item/QR Code.
   */
  next() {
    const index = this.index() + 1;
    if (index < this.data.value.length) {
      this.setSelected(this.data.value[index]);
    } else {
      console.warn('Store: End of the array reached.')
    }
  }

  /**
   * Capture the submitted results
   */
  capture(result: ITestResultEntry) {
    console.log('Store: Capture the scan result: ', result)
    this.results.addEntry(result)
    this.serialize();
  }

  /**
   * Store the results
   */
  public serialize() {
    this.localStorage.setItem(LocalStorageService.SCAN_RESULT_KEY, this.results);
  }
  /**
   * Clear the results
   */
  public clear() {
    this.localStorage.removeItem(LocalStorageService.SCAN_RESULT_KEY);
  }

  /**
   * Load the results
   */
  public deserialize(): any {
    return this.localStorage.getItem(LocalStorageService.SCAN_RESULT_KEY);
  }

  /**
   * The current index of the selected QR code
   */
  private index() {
    const index = this.data.value.findIndex(i => {
      return i.title === this.selected.value?.title
    })
    return index;
  }
}
