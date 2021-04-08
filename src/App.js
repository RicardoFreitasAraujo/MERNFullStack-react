import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import NewPlace from './places/pages/NewPlace';
import UpdatePlace from './places/pages/UpdatePlace';
import UserPlaces from './places/pages/UserPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import Auth from './user/pages/Auth';
import Users from './user/pages/User';

const App = () => {

  return (
    <BrowserRouter>
      <MainNavigation/>
      <main>
        <Switch>
          <Route path="/" component={Users} exact={true}/>
          <Route path="/:userId/places" component={UserPlaces} exact={true} />
          <Route path="/places/new" component={NewPlace} exact={true}/>
          <Route path="/places/:placeId" component={UpdatePlace} exact={true}/>
          <Route path="/auth" component={Auth} exact={true}/>
          <Redirect to="/"/>
        </Switch>
      </main>  
    </BrowserRouter>
  );
}

export default App;
