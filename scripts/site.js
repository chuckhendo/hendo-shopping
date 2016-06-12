import React from "react";
import {render} from "react-dom";

import firebase from "firebase";

import Login from "./components/Login";
import Main from "./components/Main";


// Initialize Firebase
var config = {
    apiKey: "AIzaSyClSTJIcZnSuhoKBXYUF2JrIyTGeqlrgOM",
    authDomain: "hendo-shopping.firebaseapp.com",
    databaseURL: "https://hendo-shopping.firebaseio.com",
    storageBucket: "hendo-shopping.appspot.com"
};

firebase.initializeApp(config);

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    user: user,
                    loading: false
                });
            } else {
                this.setState({
                    user: null,
                    loading: false
                });
            }
        });
    }

    render() {
        if(this.state.loading) {
            return (
                <div className="loading">Loading...</div>
            );
        }

        if(this.state.user) {
            return <Main />;
        }

        return <Login />;
    }
}

render(<App />, document.querySelector("#root"));