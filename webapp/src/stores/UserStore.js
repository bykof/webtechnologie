import {extendObservable} from 'mobx';
import Cookies from 'js-cookie';
import axios from 'axios';
import {usermanagement_url} from '../config';
import GroupStore from "./GroupStore";

export default class UserStore {
  COOKIE_NAME = 'api-key';
  
  constructor() {
    this.id = null;
    extendObservable(
      this,
      {
        groups: [],
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_again: '',
        is_logged_in: Cookies.get(this.COOKIE_NAME) !== undefined
      }
    );
  }
  
  initUserByResponse(response, resolve) {
    this.id = response.data.id;
    response.data.groups.forEach(
      (group_id) => {
        let group_store = new GroupStore(group_id);
        this.groups.push(group_store);
      }
    );
    
    Cookies.set(this.COOKIE_NAME, response.data, {expires: 7});
    this.is_logged_in = true;
    resolve(response);
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
          this.initUserByResponse(response, resolve);
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
          this.initUserByResponse(response, resolve);
        }
      ).catch(
        (error) => {
          reject(error);
        }
      );
    });
  }
}