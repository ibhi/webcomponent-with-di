export class UserComponent extends HTMLElement {
    get user() {
        return this._user;
    }

    set user(val) {
        if(this._user !== val) {
            this._user = val;
            this._render(this._user);
        }
    }
    connectedCallback() {
        // this._render()
    }

    _render(user) {
        this.innerHTML = `<li>${user.firstName} ${user.lastName}</li>`
    }

}