import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  useLocation,
  useParams,
  Prompt,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import facade from "./apiFacade";
import LoggedIn from "./LoggedIn";
import LoginForm from "./loginForm";
import Paws from "./paws2.jpg";

const paws = {
  backgroundImage: `url(${Paws})`,
};

function App() {
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
          <FetchDefault />
        </Route>
        <Route path="/page2">
          <Placeholder />
        </Route>
        <Route path="/page3">
          <User />
        </Route>
        <Route path="/page4">
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

function FetchDefault() {
  const [dto, setDTO] = useState({ name: "...", address: "...", phone: "..." });

  useEffect(() => {
    facade.fetchDefault(setDTO);
  }, []);

  return (
    <div style={{ backgroundColor: "#F5F5DC" }} align="center">
      <h3>Random fact sent in by {dto.name}!</h3>

      {<p>Did you know that {dto.data}</p>}

      <br />
      <h4>Persons personal info: </h4>
      <p>{dto.name}</p>
      <p>Address: {dto.address}</p>
      <p>Phone: {dto.phone}</p>
    </div>
  );
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
          Page2
        </NavLink>
      </li>
      {loggedIn && (
        <>
          <li>
            <NavLink activeClassName="active" to="/page3">
              Page 3
            </NavLink>
          </li>
          <li>
            <NavLink exact activeClassName="active" to="/page4">
              Page 4
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

function Home() {
  return (
    <div style={{ backgroundColor: "#F5F5DC" }} align="center">
      <h3>Welcome to Cat-Central!</h3>
      <p>TODO</p>
    </div>
  );
}

function Placeholder() {
  return <h3>TODO</h3>;
}

function User() {
  const [errorUser, setErrorUser] = useState("");
  const [cats, setCats] = useState([]);
  const [dataFromServer, setDataFromServer] = useState("");
  const [cat, setCat] = useState({});

  useEffect(() => {
    facade
      .fetchDataUserCats()
      .then((data) => setCats(data))
      .catch((err) => {
        err.fullError.then((err) => {
          setErrorUser(err.message);
        });
      });
  }, []);

  useEffect(() => {
    facade
      .fetchDataUser()
      .then((data) => setDataFromServer(data.msg))
      .catch((err) => {
        err.fullError.then((err) => {
          setErrorUser(err.message);
        });
      });
  }, []);

  const handleChange = (evt) => {
    const target = evt.target;
    const value = target.value;
    const prop = target.id;
    const tmpCat = { ...cat, [prop]: value };
    setCat(tmpCat);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    facade.addCatU(cat);
  }

  return (
    <div style={{ backgroundColor: "#F5F5DC" }} align="center">
      <h1>{dataFromServer}</h1>
      <h3>List of your cats:</h3>
      <table>
        <thead>
          <tr><th>Name</th><th>Race</th><th>Owner</th></tr>
        </thead>
        <tbody>
        {cats.map((cat) => (
          <tr>
            <td>{cat.name}</td><td>{cat.race}</td><td>{cat.owner}</td>
          </tr>
        ))}
        </tbody>
      </table>

      <p>{errorUser}</p>
<form onSubmit={handleSubmit}>
  <h4>Register new cat</h4>
  <input type="text" id="name" placeholder="name" onChange={handleChange}/>
  <input type="text" id="race" placeholder="race" onChange={handleChange}/>
  <input type="submit" value="Send"/>
</form>
    </div>
  );
}

function Admin() {
  const [errorAdmin, setErrorAdmin] = useState("");
  const [dataFromServer, setDataFromServer] = useState("");
  const [cats, setCats] = useState([]);

  useEffect(() => {
    facade
      .fetchDataAdminCats()
      .then((data) => setCats(data))
      .catch((err) => {
        err.fullError.then((err) => {
          setErrorAdmin(err.message);
        });
      });
  }, []);

  useEffect(() => {
    facade
      .fetchDataAdmin()
      .then((data) => setDataFromServer(data.msg))
      .catch((err) => {
        err.fullError.then((err) => {
          setErrorAdmin(err.message);
        });
      });
  }, []);

  return (
    <div style={{ backgroundColor: "#F5F5DC" }} align="center">
      <h3>{dataFromServer}</h3>
      <h3>List of your cats:</h3>
      <table>
        <thead>
          <tr><th>Name</th><th>Race</th><th>Owner</th></tr>
        </thead>
        <tbody>
        {cats.map((cat) => (
          <tr>
            <td>{cat.name}</td><td>{cat.race}</td><td>{cat.owner}</td>
          </tr>
        ))}
        </tbody>
      </table>
      <p>{errorAdmin}</p>
    </div>
  );
}

export default App;
