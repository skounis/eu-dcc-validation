import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  static SCAN_RESULT_KEY = 'scan_result';

  constructor() { }

  getItem(key: string): any {
    const json = localStorage.getItem(key);
    try {
      return json ? JSON.parse(json) : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value, null, 2));
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }
}
