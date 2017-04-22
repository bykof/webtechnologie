import {Component} from '@angular/core';

@Component({
  template: `
    <div class="row justify-content-center">
      <div class="col-8">
        <ul id="signin-nav" class="nav nav-tabs justify-content-center mb-5">
          <li class="nav-item">
            <a class="nav-link" routerLinkActive="active" routerLink="login">Einloggen</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLinkActive="active" routerLink="register">Registrierung</a>
          </li>
        </ul>
      </div>
    </div>
    <router-outlet></router-outlet>
  `,
})
export class SignInComponent {
}
