import {Component} from '@angular/core';
import {UserManagementService} from '../services/user_management.service';

@Component({
  selector: 'login',
  template: `
    <div class="row justify-content-center">
      <div class="col-8">
        <div [hidden]="!apiError"
             class="alert alert-danger">
          Es ist ein Fehler aufgetreten
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-8">
        <form #loginForm="ngForm" (ngSubmit)="doLogin()">
          <div class="form-group row">
            <label for="email" class="col-sm-2 col-form-label">Email</label>
            <div class="col-sm-10">
              <input
                type="email"
                class="form-control"
                id="email"
                #emailInput="ngModel"
                [(ngModel)]="email"
                name="email"
                email required
              >
              <div [hidden]="emailInput.valid || emailInput.pristine"
                   class="alert alert-danger">
                Dieses Feld muss eine Email sein
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label for="password" class="col-sm-2 col-form-label">Passwort</label>
            <div class="col-sm-10">
              <input
                type="password"
                class="form-control"
                id="password"
                #passwordInput="ngModel"
                [(ngModel)]="password"
                name="password"
                required
              >
              <div [hidden]="passwordInput.valid || passwordInput.pristine"
                   class="alert alert-danger">
                Passwort muss eingegeben werden
              </div>
            </div>

          </div>
          <div class="form-group row justify-content-end">
            <div class="col">
              <button type="submit" class="btn btn-primary" [disabled]="!loginForm.form.valid">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class LoginComponent {
  email: String = '';
  password: String = '';
  apiError: String;
  
  constructor(private user_management_service: UserManagementService) {
  }
  
  doLogin() {
    this.user_management_service.login(
      this.email,
      this.password
    ).subscribe(
      user => user,
      error => this.apiError = error
    );
  }
}
