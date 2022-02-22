import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AppStore } from '../stores/app.store';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import * as _ from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { DownloadDialogComponent } from '../components/download-dialog/download-dialog.component';
import { WelcomeDialogComponent } from '../components/welcome-dialog/welcome-dialog.component';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import packageJSON from '../../package.json'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public get country() {
    return this.store.country;
  }

  public get platform() {
    return this.store.platform;
  }

  version = packageJSON.version;
  title = 'dcc-validation-wire';
  showFiller = false;

  downloadJsonHref: any;

  constructor(public store: AppStore,
    private sanitizer: DomSanitizer,
    readonly snackBar: MatSnackBar,
    public dialog: MatDialog) {
    
    this.store.getMessage().subscribe((message: string) => {
      if (!message) { return }
      this.open(message);
    });
  }

  ngOnInit() {
    this.restoreOrWelcome()
  }

  restoreOrWelcome() {
    !this.restore() ? this.welcome() : null;
  }

  restore() {
    return this.store.deserialize();
  }

  export() {
    const data = this.store.deserialize();
    const theJSON = JSON.stringify(data, null, 2);
    this.downloadJsonHref = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
    this.open('Export is ready for download.', 'Close');
  }

  upload() {
    this.store.sanitize();
    this.openDownloadDialog();
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

  openDownloadDialog() {
    this.export();
    const data = {
      filename: this.store.getResults().filename,
      url: this.downloadJsonHref
    };
    const dialogRef = this.dialog.open(DownloadDialogComponent, {
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  reset() {
    if(this.store.getResults().results.length > 0) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        disableClose: true,
        data: {
          message: 'There is already a testing session in progress. If you change the platform or the country the stored results will be deleted.'
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        if(!!result) {
          this.store.flushResult();
          this.store.setMessage('All the results are deleted.')
          this.welcome();
        }
      });
    } else {
      this.welcome();
    }
  }

  /**
   * Open the welcome dialog. 
   */
  public welcome() {

    const dialogRef = this.dialog.open(WelcomeDialogComponent, {
      disableClose: true,
      data: {}
    });
  }

  /**
   * Flush the test results from Store and Local storage.
   */
  flush() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(!!result) {
        this.store.flushResult();
        this.store.setMessage('All the results are deleted.')
      }
    });
    
  }
}
