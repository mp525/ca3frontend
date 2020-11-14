import {
  mainURL,
  userInfoEndpoint,
  adminInfoEndpoint,
  defaultEndpoint,
  loginEndpoint,
  userCatsEndpoint,
  adminCatsEndpoint,
  addCatUser,
  addCatAdmin,
  adminAllCats,
  deleteCatAdmin,
  breeds,
  breedPic
} from "./settings";

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

function apiFacade() {
  /* Insert utility-methods from a latter step (d) here (REMEMBER to uncomment in the returned object when you do)*/

  const setToken = (token) => {
    localStorage.setItem("jwtToken", token);
  };
  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };
  const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
  };
  const logout = () => {
    localStorage.removeItem("jwtToken");
  };

  const login = (user, password) => {
    const options = makeOptions("POST", true, {
      username: user,
      password: password,
    });
    return fetch(mainURL + loginEndpoint, options)
      .then(handleHttpErrors)
      .then((res) => {
        setToken(res.token);
      });
  };

  const isAdmin = () => {
    const jwtData = getToken().split(".")[1];
    const decodedJwtJsonData = window.atob(jwtData);
    const decodedJwtData = JSON.parse(decodedJwtJsonData);
    const isAdmin = decodedJwtData.roles;
    return isAdmin;
  }

  const addCatU = (cat) => {
    const options = makeOptions("POST", true, cat);
    return fetch(mainURL + addCatUser, options)
    .then(handleHttpErrors);
  }

  const addCatA = (cat) => {
    const options = makeOptions("POST", true, cat);
    return fetch(mainURL + addCatAdmin, options)
    .then(handleHttpErrors);
  }

  const fetchDataUser = () => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(mainURL + userInfoEndpoint, options).then(handleHttpErrors);
  };

  const fetchDataUserCats = () => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(mainURL + userCatsEndpoint, options).then(handleHttpErrors);
  };

  const fetchDataAdmin = () => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(mainURL + adminInfoEndpoint, options).then(handleHttpErrors);
  };

  const fetchDataAdminCats = () => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(mainURL + adminCatsEndpoint, options).then(handleHttpErrors);
  };

  const fetchAllCats = (setAllCats) => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(mainURL + adminAllCats, options).then(handleHttpErrors)
    .then((data) => {
      setAllCats(data);
    });
  };

  const deleteCat = (id) => {
    const options = makeOptions("DELETE", true);
    const delURL = deleteCatAdmin + "/" + id;
    return fetch(mainURL + delURL, options)
    .then(handleHttpErrors);
  }

  const fetchDefault = (callback) => {
    const options = makeOptions("GET");
    return fetch(mainURL + defaultEndpoint, options)
      .then(handleHttpErrors)
      .then((data) => {
        callback(data);
      });
  };

  const getAllBreeds = (callback) => {
    const options = makeOptions("GET");
    return fetch(mainURL + breeds, options)
    .then(handleHttpErrors)
    .then(data=>{
      callback(data);
    });
  } 

  const getBreedPicture = (id, callback) => {
    const breed_id = id;
    const options = makeOptions("GET", breed_id);  
    fetch(breedPic, options)
    .then(handleHttpErrors)
    .then(data=>{callback(data)});
  }

  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        "x-api-key" : "2af8a46b-ad85-4f6f-a101-0ffbaaa3fd7c"
      },
    };
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };
  return {
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    fetchDataUser,
    fetchDataAdmin,
    fetchDefault,
    fetchDataUserCats,
    fetchDataAdminCats,
    addCatU,
    addCatA,
    fetchAllCats,
    deleteCat,
    isAdmin,
    getAllBreeds,
    getBreedPicture
  };
}
const facade = apiFacade();
export default facade;
