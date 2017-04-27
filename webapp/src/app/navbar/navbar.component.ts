import {Component} from '@angular/core';

@Component({
  selector: 'navbar',
  template: `
    <nav class="navbar navbar-toggleable-md fixed-top navbar-light bg-faded">
      <button
        class="navbar-toggler navbar-toggler-right"
        type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <a
        class="navbar-brand"
        routerLink="">
        Split|it
      </a>

      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
            <a class="nav-link" routerLink="">Home</a>
          </li>
          <li class="nav-item" routerLinkActive="active">
            <a class="nav-link" routerLink="about">Über</a>
          </li>
          <li class="nav-item pull-right" routerLinkActive="active">
            <a class="nav-link" routerLink="signin">Anmelden</a>
          </li>
        </ul>
      </div>
    </nav>
  `,
})
export class NavbarComponent {
}
