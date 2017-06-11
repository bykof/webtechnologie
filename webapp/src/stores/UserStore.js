import {extendObservable} from 'mobx';
import Cookies from 'js-cookie';
import axios from 'axios';
import {usermanagement_url} from '../config';

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
        is_logged_in: Cookies.get(this.COOKIE_NAME) !== undefined
      }
    );
  }
  
  log_in() {
    return new Promise((resolve, reject) => {
      axios.post(
        usermanagement_url + 'users/login/',
        {
          email: this.email,
          password: this.password,
        }
      ).then(
        (response) => {
          Cookies.set(this.COOKIE_NAME, response, {expires: 7});
          this.is_logged_in = true;
          resolve(response);
        }
      ).catch(
        (error) => {
          reject(error);
        }
      );
    });
  }
  
  logout() {
    Cookies.remove(this.COOKIE_NAME);
    this.is_logged_in = false;
  }
  
  register() {
    return new Promise((resolve, reject) => {
      axios.post(
        usermanagement_url + 'users/',
        {
          email: this.email,
          password: this.password,
          fist_name: this.first_name,
          last_name: this.last_name
        }
      ).then(
        (response) => {
          Cookies.set(this.COOKIE_NAME, response, {expires: 7});
          this.is_logged_in = true;
          resolve(response);
        }
      ).catch(
        (error) => {
          reject(error);
        }
      );
    });
  }
}