import 'reflect-metadata';
// import 'document-register-element';
import { ReflectiveInjector } from 'injection-js';
import { Http } from './src/http';
import { UsersComponent } from './src/users.component';
import { UserComponent } from './src/user.component';
import './users.json';

const injector = ReflectiveInjector.resolveAndCreate([
  Http,
  UsersComponent
  // {
  //   provide: Http,
  //   useFactory: () => new Http(),
  //   deps:[]
  // },
  // { 
  //   provide: UsersComponent,
  //   // useValue: UsersComponent
  //   useFactory: () => { 
  //     return new UsersComponent()
  //   },
  //   deps:[]
  // }
]);
console.log('Users comp', injector.get( UsersComponent));

customElements.define('user-component', UserComponent);
customElements.define('users-component', injector.get(UsersComponent));