import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {HomeComponent} from './home.component';
import {AboutComponent} from './about.component';
import {LoginComponent} from './login.component';
import {FormsModule} from '@angular/forms';
import {UserManagementService} from '../services/user_management.service';
import {HttpModule} from '@angular/http';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  declarations: [
    HomeComponent,
    LoginComponent,
    AboutComponent,
  ],
  providers: [
    UserManagementService
  ]
})
export class PagesModule {
}
