import {extendObservable} from 'mobx';


export default class UserStore {
  constructor() {
    extendObservable(
      this,
      {
        count: 0,
      }
    );
  }
  
  increment() {
    this.count++;
  }
}