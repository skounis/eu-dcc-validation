import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

import { AppStore } from '../../stores/app.store';
import { environment } from '../../environments/environment';
import { PlatformEnum } from '../../interfaces/model.interface';
import { countries as countriesList } from '../../assets/countries.data';

@Component({
  selector: 'app-welcome-dialog',
  templateUrl: './welcome-dialog.component.html',
  styleUrls: ['./welcome-dialog.component.css']
})
export class WelcomeDialogComponent implements OnInit {

  get acceptUserCredentials() {
    return environment.github.acceptUserCredentials;
  }

  countries: Array<string> = [];
  filteredOptions!: Observable<string[]>;

  welcomeForm = new FormGroup({
    countryControl: new FormControl('', Validators.required),
    platformControl: new FormControl('', Validators.required)
  });

  public get country() {
    return this.store.country;
  }

  public set country(value: string) {
    this.store.country = value;
  }

  public get platform() {
    return this.store.platform || PlatformEnum.Android;
  }

  public set platform(value: PlatformEnum) {
    this.store.platform = value;
  }

  public get errors() {
    console.log('Validation errors', this.welcomeForm.errors)
    return this.welcomeForm.errors
  }

  constructor(private store: AppStore) {
    this.countries = this.loadCountries();
  }

  ngOnInit(): void {
    this.welcomeForm.setValidators(this.createCountriesValidator());
    this.loadCountries();
    const countryControl = this.welcomeForm.get("countryControl");
    const platformControl = this.welcomeForm.get("platformControl");
    if (!!countryControl) {
      this.filteredOptions = countryControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value)),
      );
    }
    countryControl?.valueChanges.subscribe(() => {
      console.log('Country selected:', countryControl.value)
    })
    platformControl?.valueChanges.subscribe(() => {
      console.log('Platform selected:', platformControl.value)
    })
  }

  onSubmit() {
    console.warn(this.welcomeForm.value);

    if (this.welcomeForm.status === 'INVALID') {
      // display error in your form
      console.error('Form invalid!')
    } else {
      //   console.log(form.value)
      //   this.dialog.closeAll(); // Close opened diaglo
      // // do whatever you want to do with your data
    }

  }

  public get invalid() {
    return this.welcomeForm.status === 'INVALID';
  }

  private loadCountries() {
    const grouped = _.groupBy(this.store.getData().value, 'country');
    return  _.union(Object.keys(grouped),countriesList).sort();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.countries.filter(option => option.toLowerCase().includes(filterValue));
  }

  createCountriesValidator(): ValidatorFn {
    // https://blog.angular-university.io/angular-custom-validators/
    return (control: AbstractControl): ValidationErrors | null => {

      const value = this.welcomeForm.get("countryControl")?.value

      if (!value) {
        return null;
      }

      if (this.countries.filter((e) => e === value).length > 0) {
        return null;
      }

      return { invalidCountry: true }
    }
  }
}
