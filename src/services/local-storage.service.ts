import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  static SCAN_RESULT_KEY = 'scan_result';

  constructor() { }

  getItem(key: string): any {
    const json = localStorage.getItem(key);
    return json ? JSON.parse(json) : null;
  }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }
}
