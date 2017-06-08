import 'reflect-metadata';
// import 'document-register-element';
import { ReflectiveInjector } from 'injection-js';
import { Http } from './src/http';
import { UsersComponent } from './src/users.component';
import { UserComponent } from './src/user.component';

const injector = ReflectiveInjector.resolveAndCreate([
  Http,
  { 
    provide: UsersComponent,
    useFactory: (http) => new UsersComponent(http),
    deps:[Http]
  }
]);


customElements.define('user-component', UserComponent);
customElements.define('users-component', injector.get(UsersComponent));