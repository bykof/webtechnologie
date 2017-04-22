import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';

import {AppComponent}  from './app.component';
import appRoutes from './routes';
import {PageNotFoundComponent} from './pagenotfound/pagenotfound.component';
import {PagesModule} from './pages/pages.module';
import {NavbarComponent} from './navbar/navbar.component';
import {AuthGuard} from './services/user_management.service';
import {LoginComponent} from './components/login.component';
import {RegisterComponent} from './components/register.component';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';


@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpModule,
    PagesModule
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
  ],
  bootstrap: [AppComponent],
  providers: [AuthGuard],
})
export class AppModule {
}
