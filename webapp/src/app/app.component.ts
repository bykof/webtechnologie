import {Component} from '@angular/core';

@Component({
    selector: 'webapp',
    template: `<h1>Hi {{name}}</h1>`,
})
export class AppComponent {
    name = 'Angular';
}
