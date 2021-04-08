import React, { useState, useCallback } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import NewPlace from './places/pages/NewPlace';
import UpdatePlace from './places/pages/UpdatePlace';
import UserPlaces from './places/pages/UserPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import Auth from './user/pages/Auth';
import Users from './user/pages/User';
import { AuthContext } from './shared/context/auth-context';

const App = () => {

  const [isLoggedIn, setisLoggedIn] = useState(false);
  
  const login = useCallback(() => {
    setisLoggedIn(true);
  },[]);

  const logout = useCallback(() => {
    setisLoggedIn(false);
  },[]);

  let routes;
  if (isLoggedIn) {
    routes = (
    <Switch>
      <Route path="/" component={Users} exact={true}/>
      <Route path="/:userId/places" component={UserPlaces} exact={true} />
      <Route path="/auth" component={Auth} exact={true}/>
      <Route path="/places/new" component={NewPlace} exact={true}/>
      <Route path="/places/:placeId" component={UpdatePlace} exact={true}/>
      <Redirect to="/"/>
    </Switch>);
  } else {
    routes = (
      <Switch>
        <Route path="/" component={Users} exact={true}/>
        <Route path="/:userId/places" component={UserPlaces} exact={true} />
        <Route path="/auth" component={Auth} exact={true}/>
        <Redirect to="/auth"/>
      </Switch>
    );
  }

  return (
    <AuthContext.Provider value={{isLoggedIn: isLoggedIn, login: login, logout: logout}}>
      <BrowserRouter>
        <MainNavigation/>
        <main>
          <Switch>
            {routes}
          </Switch>
        </main>  
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
