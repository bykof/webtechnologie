import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {User} from '../models/user';

@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router) {
  }
  
  canActivate(): boolean {
    this.router.navigate(['/login']);
    return false;
  }
}

@Injectable()
export class UserManagementService {
  private auth_url = 'user_management';
  
  constructor(private http: Http) {
  }
  
  login(email: String, password: String): Observable<User> {
    return this.http.post(
      this.auth_url + '/login',
      {
        email: email,
        password: password,
      }
    ).map(
      (res: Response) => res.json()
    ).catch(
      (error: any) => Observable.throw(error.json().error || 'Server error')
    );
  }
  
  register(email: String, password: String): Observable<User> {
    return this.http.post(
      this.auth_url + '/register',
      {
        email: email,
        password: password,
      }
    ).map(
      (res: Response) => res.json()
    ).catch(
      (error: any) => Observable.throw(error.json().error || 'Server error')
    );
  }
}
