import "./App.css";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  useLocation,
  useHistory,
} from "react-router-dom";
import facade from "./apiFacade";
import LoggedIn from "./LoggedIn";
import LoginForm from "./loginForm";
import Paws from "./paws2.jpg";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Home";
import User from "./User";
import Admin from "./Admin";
import FetchFact from "./FetchFact";
import CatBreeds from "./CatBreeds";

const paws = {
  backgroundImage: `url(${Paws})`,
};

function App() {
  //const [breeds, setBreeds] = useState([]);
  const [errorMes, setErrorMes] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  let history = useHistory();

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
  };
  const login = (user, pass) => {
    facade
      .login(user, pass)

      .then((res) => setLoggedIn(true))
      .catch((err) => {
        err.fullError.then((err) => {
          setErrorMes(err.message);
        });
      });
    history.push("/");
  };

  const setLoginStatus = (status) => {
    setLoggedIn(status);
    history.push("/");
  };

  return (
    <div>
      <Header loginMsg={loggedIn ? "Logout" : "Login"} loggedIn={loggedIn} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/cat-fact">
          <FetchFact />
        </Route>
        <Route path="/page2">
          <CatGifs />
        </Route>
        <Route path="/breeds">
          <CatBreeds />
        </Route>
        <Route path="/user">
          <User />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/login">
          {!loggedIn ? (
            <LoginForm
              errorMes={errorMes}
              setErrorMes={setErrorMes}
              login={login}
            />
          ) : (
            <div>
              <LoggedIn />
              <button onClick={logout}>Logout</button>
            </div>
          )}
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </div>
  );
}
{
  /* <Login
            loginMsg={loggedIn ? "Logout" : "Login"}
            loggedIn={loggedIn}
            setLoginStatus={setLoginStatus}
          /> */
}

function Header({ loggedIn, loginMsg }) {
  return (
    <ul className="header" style={paws}>
      <li>
        <NavLink exact activeClassName="active" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/cat-fact">
          Cat fact
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/page2">
          Cat gifs
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/breeds">
          Cat breeds
        </NavLink>
      </li>
      {loggedIn && (
        <>
          <li>
            <NavLink activeClassName="active" to="/user">
              User page
            </NavLink>
          </li>
          <li>
            <NavLink exact activeClassName="active" to="/admin">
              Admin page
            </NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink exact activeClassName="active" to="/login">
          {loginMsg}
        </NavLink>
      </li>
    </ul>
  );
}

function NoMatch() {
  let location = useLocation();
  return (
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
  );
}

function Placeholder() {
  return <h3>TODO</h3>;
}

function CatGifs() {
  return (
    <div class="col-6" align="center">
      <Card>
        <Card.Title>Random cat video</Card.Title>
        <Card.Img src="http://thecatapi.com/api/images/get?format=src&type=gif" />
      </Card>
    </div>
  );
}

export default App;
