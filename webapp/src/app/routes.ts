import {Routes} from '@angular/router';
import {PageNotFoundComponent} from './pagenotfound/pagenotfound.component';
import {HomeComponent} from './pages/home.component';
import {AboutComponent} from './pages/about.component';
import {AuthGuard} from './services/user_management.service';
import {SignInComponent} from './pages/signin.component';
import {LoginComponent} from './components/login.component';
import {RegisterComponent} from './components/register.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'signin',
    component: SignInComponent,
    children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
    ]
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
