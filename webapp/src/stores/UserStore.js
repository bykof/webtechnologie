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
    
    if (this.is_logged_in) {
      this.initUser();
    }
    this.updateGroups = this.updateGroups.bind(this);
  }
  
  getUserInfoFromCookie() {
    return JSON.parse(Cookies.get(this.COOKIE_NAME));
  }
  
  initUser() {
    let user = this.getUserInfoFromCookie();
    
    // Set default values
    this.id = user._id;
    
    // Retrieve the groups
    this.updateGroups();
  }
  
  updateGroups() {
    let user = this.getUserInfoFromCookie();
    
    axios.get(
      usermanagement_url + 'users/' + user._id + '/'
    ).then(
      (response) => {
        this.groups.clear();
        response.data.groups.forEach(
          (group_id) => {
            let group_store = new GroupStore(group_id);
            this.groups.push(group_store);
          }
        );
      }
    ).catch(
      (error) => {
        console.log(error.response);
      }
    );
  }
  
  initUserByResponse(response, resolve) {
    this.id = response.data._id;
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