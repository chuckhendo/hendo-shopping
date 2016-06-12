import React from "react";

import firebase from "firebase";

export default class Login extends React.Component {
    login(e) {
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.refs.email.value, this.refs.password.value).catch(function (error) {
            
        });
    }

    render() {
        return (
            <form className="login" onSubmit={this.login.bind(this) }>
                <input ref="email" type="email" placeholder="Email" />
                <input ref="password" type="password" placeholder="Password" />
                <button type="submit">Login</button>
            </form>
        );
    }
}