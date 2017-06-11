import {extendObservable} from 'mobx';
import axios from 'axios';
import {usermanagement_url} from "../config";


export default class GroupStore {
  constructor(id) {
    this.id = id;
    extendObservable(
      this,
      {
        users: [],
        name: ''
      }
    );
    this.initUsers();
  }
  
  initUsers() {
    axios.get(
      usermanagement_url + 'groups/' + this.id,
    ).then(
      (response) => {
        this.users = response.data.users;
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    )
  }
}