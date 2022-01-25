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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public set country(value: string) {
    this.store.country = value;
  }

  public set platform(value: PlatformEnum) {
    this.store.platform = value;
  }

  title = 'dcc-validation-wire';
  showFiller = false;

  downloadJsonHref: any;

  countries: Array<string> = [];
  countryControl = new FormControl();
  platformControl = new FormControl();
  filteredOptions!: Observable<string[]>;

  constructor(private store: AppStore,
    private sanitizer: DomSanitizer,
    readonly snackBar: MatSnackBar,
    public dialog: MatDialog) {
    this.countries = this.prepare();
    console.log(this.countries);
    this.store.getMessage().subscribe((message: string) => {
      if (!message) { return }
      this.open(message);
    });
  }

  ngOnInit() {
    this.filteredOptions = this.countryControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );

    this.countryControl.valueChanges.subscribe(() => {
      console.log('Country selected:', this.countryControl.value)
    })

    this.platformControl.valueChanges.subscribe(() => {
      console.log('Platform selected:', this.platformControl.value)
    })
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
  private prepare() {
    let grouped = _.groupBy(this.store.getData().value, 'country');
    return Object.keys(grouped);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.countries.filter(option => option.toLowerCase().includes(filterValue));
  }
}
