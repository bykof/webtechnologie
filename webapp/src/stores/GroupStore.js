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
    this.initGroup();
  }
  
  initGroup() {
    this.users.clear();
    axios.get(
      usermanagement_url + 'groups/' + this.id,
    ).then(
      (response) => {
      
        this.name = response.data.name;
        response.data.users.forEach(
          (user) => {
            this.users.push(user)
          }
        );
      }
    ).catch(
      (error) => {
        console.error(error, error.response);
      }
    )
  }
  
  /**
   * Erstellt eine Gruppe in der Datenbank mit data
   *
   * data: {name}
   * return: GroupStore
   */
  static create(data) {
    return new Promise(
      (resolve, reject) => {
        axios.post(
          usermanagement_url + 'groups/',
          data
        ).then(
          (response) => {
            let group_store = new GroupStore(response.data._id);
            resolve(group_store);
          }
        ).catch(
          (error) => {
            console.error(error, error.response);
            reject(error);
          }
        )
      }
    );
  }
  
  addUser(user_id) {
    return new Promise((resolve, reject) => {
      axios.post(
        usermanagement_url + 'groups/' + this.id + '/add_user/' + user_id
      ).then(
        (response) => {
          resolve(response);
        }
      ).catch(
        (error) => {
          console.error(error.response);
          reject(error);
        }
      )
    });
  }
  
  delete() {
    return new Promise(
      (resolve, reject) => {
        axios.delete(
          usermanagement_url + 'groups/' + this.id + '/'
        ).then(
          (response) => {
            resolve(response);
          }
        ).catch(
          (error) => {
            console.error(error.response);
            reject(error);
          }
        )
      }
    );
  }
  
  removeUser(user_id) {
    return new Promise((resolve, reject) => {
      axios.post(
        usermanagement_url + 'groups/' + this.id + '/remove_user/' + user_id
      ).then(
        (response) => {
          resolve(response);
        }
      ).catch(
        (error) => {
          console.error(error.response);
          reject(error);
        }
      )
    });
  }
  
  invite(invite_email) {
    return axios.post(
      usermanagement_url + 'groups/' + this.id + '/invite',
      {
        email: invite_email
      }
    );
  }
}