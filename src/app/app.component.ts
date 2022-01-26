import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AppStore } from '../stores/app.store';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import * as _ from 'lodash';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PlatformEnum } from '../interfaces/model.interface';
import { MatDialog } from '@angular/material/dialog';
import { DownloadDialogComponent } from '../components/download-dialog/download-dialog.component';
import { WelcomeDialogComponent } from '../components/welcome-dialog/welcome-dialog.component';

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
    this.welcome();
  }

  export() {
    const data = this.store.deserialize();
    const theJSON = JSON.stringify(data, null, 2);
    this.downloadJsonHref = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
    this.open('Export is ready for download.', 'Close');
  }

  upload() {
    this.store.setMessage('Not implemented!')
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
    const data = this.downloadJsonHref;
    const dialogRef = this.dialog.open(DownloadDialogComponent, {
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
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
}
