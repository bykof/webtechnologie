import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {HomeComponent} from './home.component';
import {AboutComponent} from './about.component';
import {SignInComponent} from './signin.component';
import {FormsModule} from '@angular/forms';
import {UserManagementService} from '../services/user_management.service';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import appRoutes from '../routes';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
  ],
  declarations: [
    HomeComponent,
    SignInComponent,
    AboutComponent,
  ],
  providers: [
    UserManagementService
  ]
})
export class PagesModule {
}
