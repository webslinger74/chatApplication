import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './App.css';
import Login from '../src/components/auth/Login';
import Register from '../src/components/auth/Register';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { UserProvider } from './context/user_context';
import { ChannelProvider } from './context/channel_context';



const Root = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
        </Switch>
    </Router>
)


ReactDOM.render(
         <UserProvider>
             <ChannelProvider>
                   <Root />
                   </ChannelProvider>
           
         </UserProvider>
                , document.getElementById('root'));

