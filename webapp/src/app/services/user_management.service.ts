import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
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
  
  private extractData(res: Response | any) {
    return res.json();
  }
  
  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
  
  login(email: String, password: String): Observable<User> {
    return this.http.post(
      this.auth_url + '/login',
      {
        email: email,
        password: password,
      }
    ).map(
      this.extractData
    ).catch(
      this.handleError
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
      this.extractData
    ).catch(
      this.handleError
    );
  }
}
