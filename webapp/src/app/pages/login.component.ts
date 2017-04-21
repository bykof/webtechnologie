import {Component} from '@angular/core';
import {UserManagementService} from '../services/user_management.service';

@Component({
  template: `
    <div class="row">
      <div class="col">
        <div [hidden]="errorMessage != ''"
             class="alert alert-danger">
          Es ist ein Fehler aufgetreten
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <form #loginForm="ngForm" (ngSubmit)="doLogin()">
          <div class="form-group row">
            <label for="email" class="col-2 col-form-label">Email</label>
            <div class="col-10">
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
            <label for="password" class="col-2 col-form-label">Passwort</label>
            <div class="col-10">
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
          <div class="form-group row">
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
  errorMessage: String = '';
  
  constructor(private user_management_service: UserManagementService) {
  }
  
  doLogin() {
    this.user_management_service.login(this.email, this.password).subscribe(
      user => user,
      error => this.errorMessage = error
    );
  }
}
