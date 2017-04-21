import {Routes} from '@angular/router';
import {PageNotFoundComponent} from './pagenotfound/pagenotfound.component';
import {HomeComponent} from './pages/home.component';
import {AboutComponent} from './pages/about.component';
import {AuthGuard} from './services/user_management.service';
import {LoginComponent} from './pages/login.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'about',
    component: AboutComponent,
    pathMatch: 'full',
  },
  /*
   {
   canActivate: [AuthGuard],
   path: 'secret',
   component: SecretComponent,
   pathMatch: 'full',
   },
   */
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

export default appRoutes;
