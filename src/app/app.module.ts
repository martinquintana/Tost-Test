import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TOTS_CORE_PROVIDER, TotsCoreModule } from '@tots/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TOTS_AUTH_PROVIDER, TotsAuthConfig, TotsAuthInterceptor, TotsAuthModule } from '@tots/auth';
import { TOTS_CLOUD_STORAGE_PROVIDER } from '@tots/cloud-storage';
import { ClientComponent } from './Clients/client/client.component';
import { ClientListComponent } from './Clients/client-list/client-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateClientComponent } from './Clients/create-client/create-client.component';
import { UpdateClientComponent } from './Clients/update-client/update-client.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';



@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    ClientListComponent,
    CreateClientComponent,
    UpdateClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,

    /** Angular Material Libraries */
    MaterialModule,

    /** Tots Libraries */
    TotsCoreModule,
    TotsAuthModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: TOTS_CORE_PROVIDER,
      useValue: {
        baseUrl: 'https://agency-coda.uc.r.appspot.com/'
      }
    },
    {
      provide: TOTS_CLOUD_STORAGE_PROVIDER,
      useValue: {
        bucket: 'codahub-files'
      }
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TotsAuthInterceptor,
      multi: true
    },
    {
      provide: TOTS_AUTH_PROVIDER,
      useValue: {
        signInPath: 'oauth/token',
        changePasswordPath: 'users/me/password',
      } as TotsAuthConfig
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
