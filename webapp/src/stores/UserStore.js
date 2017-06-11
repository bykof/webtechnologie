import {extendObservable, computed} from 'mobx';
import Cookies from 'js-cookie';


export default class UserStore {
  COOKIE_NAME = 'api-key';
  
  constructor() {
    extendObservable(
      this,
      {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_again: '',
        logged_in: computed(
          () => Cookies.get(this.COOKIE_NAME) !== undefined
        ),
      }
    );
  }
  
  log_in() {
    return true;
  }
  
  register() {
    return true;
  }
}