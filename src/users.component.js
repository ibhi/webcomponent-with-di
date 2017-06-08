import 'reflect-metadata';
import { Inject } from 'injection-js';
import { Http } from './http';


export function UsersComponent(http) {
  return class extends HTMLElement {
    static get parameters() {
      return [[new Inject(Http)]]
    }

    get users() {
      return this._users;
    }

    set users(val) {
      this._users = val;
      this._render(this._users);
    }

    constructor() {
      super();
      console.log('Constructor ', http);
      this._http = http;
    }

    connectedCallback() {
      console.log('Connected callback');
      this._getUsers();
      this._prepare();

    }

    _prepare() {
      this.innerHTML = `<ul class="wc-users"></ul>`;
      this._ul = this.querySelector('.wc-users');
    }

    _getUsers() {
      this._http.get('/users')
        .then((res) => {
          return res.json();
        }).then((users) => {
          console.log('Users ', users);
          this._render(JSON.parse(users));
        })

    }

    _render(users) {
      this._ul.innerHTML = '';
      console.log(typeof users, users);
      users.forEach((user) => {
        const userComponent = document.createElement('user-component');
        userComponent.user = user;
        this._ul.appendChild(userComponent);
      });
    }

  }
};

UsersComponent.parameters = [[new Inject(Http)]];
