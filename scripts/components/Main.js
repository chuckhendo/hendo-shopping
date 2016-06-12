import React from "react";

import firebase from "firebase";
import classNames from "classnames";
import _ from "lodash";

const ListItem = (props) => {
    return (
        <li 
            className={classNames("item", { "completed": props.item.completed  })}
            onClick={props.toggleCompleted.bind(this, props.item.key, !props.item.completed)}
        >
            {props.item.name}
        </li>        
    );
};

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    componentWillMount() {
        firebase.database().ref("items").on("value", (snapshot) => {
            this.setState({
                items: this.convertToArray(snapshot.val())
            });
        });
    }

    logout(e) {
        e.preventDefault();
        firebase.auth().signOut();
    }

    addItem(e) {
        e.preventDefault();
        const newItem = this.refs.newItem.value;
        firebase.database().ref("items").push({
            name: newItem,
            completed: false
        });
        this.refs.newItem.value = "";
    }

    toggleCompleted(key, value) {
        firebase.database().ref(`items/${key}`).update({
            completed: value
        });
    }

    convertToArray(items) {
        return _(items).map((item, key) => {
            return Object.assign({}, item, { key });
        }).sortBy("completed").reverse().value();
    }

    render() {
        const items = this.state.items.reverse();
        
        return (
            <div className="main">
                <div className="toolbar">
                    <h1 className="title"><span>Hendo</span>Shopping</h1>
                    <button className="logout" onClick={this.logout.bind(this)}>Logout</button>
                </div>
                <form onSubmit={this.addItem.bind(this)}>
                    <input type="text" ref="newItem" placeholder="Add item" />
                    <ul className="list">
                        {items.map((item) => {
                            return <ListItem key={item.key} item={item} toggleCompleted={this.toggleCompleted.bind(this)} />;
                        })}
                    </ul>
                </form>
            </div>
        );
    }
}