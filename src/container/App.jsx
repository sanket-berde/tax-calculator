import React, { Component } from 'react'
import store from '../../src/store'
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router'
import { createBrowserHistory } from 'history'
import HomePage from './HomePage'
import AddEmployee from './AddEmployee'
import '../App.css';



class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <Router history={createBrowserHistory()} >
                    <Switch >
                        <Route exact path="/" component={HomePage} />
                        <Route exact path="/add-employee" component={AddEmployee} />
                    </Switch>
                </Router>
            </Provider>
        )
    }
}

export default (App);