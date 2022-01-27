
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppStore } from '../stores/app.store';
import { CacheDataInterceptor } from '../interceptors/cache.interceptor';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { DataLoaderService } from '../services/data-loader.service';
import { DCCDescriptionComponent } from '../components/dccdescription/dccdescription.component';
import { DCCQRComponent } from '../components/dccqr/dccqr.component';
import { DownloadDialogComponent } from '../components/download-dialog/download-dialog.component';
import { environment } from '../environments/environment';
import { ProgressComponent } from '../components/progress/progress.component'
import { QrDialogComponent } from '../components/qr-dialog/qr-dialog.component';
import { QRTreeComponent } from '../components/qrtree/qrtree.component';
import { TestResultComponent } from '../components/test-result/test-result.component';
import { WelcomeDialogComponent } from '../components/welcome-dialog/welcome-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    ConfirmDialogComponent,
    DCCDescriptionComponent,
    DCCQRComponent,
    DownloadDialogComponent,
    ProgressComponent,
    QrDialogComponent,
    QRTreeComponent,
    TestResultComponent,
    WelcomeDialogComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: loadInitialData, deps: [DataLoaderService], multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CacheDataInterceptor, multi: true },
    DataLoaderService,
    AppStore,
    ...environment.providers,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function loadInitialData(dataLoader: DataLoaderService) {
  return () => dataLoader.load();
}
