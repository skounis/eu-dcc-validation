import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AppStore } from '../stores/app.store';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dcc-validation-wire';
  showFiller = false;

  downloadJsonHref: any;

  constructor(private store: AppStore,
    private sanitizer: DomSanitizer,
    readonly snackBar: MatSnackBar) {
    this.store.getMessage().subscribe((message: string) => {
      if (!message) { return }
      this.open(message);
    });
  }

  export() {
    const data = this.store.deserialize();
    const theJSON = JSON.stringify(data, null, 2);
    this.downloadJsonHref = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
    this.open('Export is ready for download.', 'Close');
  }

  clear() {
    setTimeout(() => { this.downloadJsonHref = null }, 2000);
  }

  open(message: string, action = '', config?: MatSnackBarConfig) {
    if (!action) {
      action = 'Close';
    }
    if (!config) {
      config = {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 2000
      }
    }
    return this.snackBar.open(message, action, config);
  }
}
