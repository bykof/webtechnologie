import { AppComponent } from './app.component';

import { async, TestBed } from '@angular/core/testing';

describe('AppComponent', function () {
  let comp: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
  });

  it('should create component', () => expect(comp).toBeDefined() );
});
