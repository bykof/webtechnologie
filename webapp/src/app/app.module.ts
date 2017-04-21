import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';

import {AppComponent}  from './app.component';
import appRoutes from './routes';
import {PageNotFoundComponent} from './pagenotfound/pagenotfound.component';
import {PagesModule} from './pages/pages.module';
import {NavbarComponent} from './navbar/navbar.component';
import {AuthGuard} from './services/user_management.service';


@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    PagesModule
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    PageNotFoundComponent,
  ],
  bootstrap: [AppComponent],
  providers: [AuthGuard],
})
export class AppModule {
}
