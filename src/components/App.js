import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import UserList from "./user/UserList";
import UserCreate from './user/UserCreate';
import UserUpdate from './user/UserUpdate';
import Header from "./Header";
import Home from "./Home";
import history from "../history";
import Login from "./Login";

class App extends React.Component {
    render() {
        return (
            <div className="ui container">
                <Router history={history}>
                    <div>
                        <Header />
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/login" exact component={Login} />
                            <Route path="/users" exact component={UserList} />
                            <Route path="/create-user" exact component={UserCreate} />}
                            <Route path="/update-user/:id" exact component={UserUpdate} />
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
