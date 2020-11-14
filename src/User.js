import React, { useEffect, useState } from "react";
import facade from "./apiFacade";
import { Button, Card, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function User() {
    const [errorUser, setErrorUser] = useState("");
    const [cats, setCats] = useState([]);
    const [dataFromServer, setDataFromServer] = useState("");
    const [cat, setCat] = useState({});
    const [options, setOptions] = useState([]);
  
    useEffect(() => {
      facade
        .fetchDataUserCats()
        .then((data) => setCats(data))
        .catch((err) => {
          err.fullError.then((err) => {
            setErrorUser(err.message);
          });
        });
        facade
        .fetchDataUser()
        .then((data) => setDataFromServer(data.msg))
        .catch((err) => {
          err.fullError.then((err) => {
            setErrorUser(err.message);
          });
        });
        facade.getAllBreeds(setOptions);
    }, []);
  
  
    const handleChange = (evt) => {
      const target = evt.target;
      const value = target.value;
      const prop = target.id;
      const tmpCat = { ...cat, [prop]: value };
      setCat(tmpCat);
      console.log(cat);
    };
  
    const handleSubmit = (evt) => {
      evt.preventDefault();
      facade.addCatU(cat);
    };
  
    return (
      <div style={{ backgroundColor: "#F5F5DC" }} align="center">
        {facade.isAdmin().indexOf("user") !== -1 && (
          <>
            <h1>{dataFromServer}</h1>
            <h3>List of your cats:</h3>
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Race</th>
                  <th>Owner</th>
                </tr>
              </thead>
              <tbody>
                {cats.map((cat) => (
                  <tr key={cat.id}>
                    <td>{cat.name}</td>
                    <td>{cat.race}</td>
                    <td>{cat.owner}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
  
            
            <form onSubmit={handleSubmit}>
              <h4>Register new cat</h4>
              <input
                type="text"
                id="name"
                placeholder="name"
                onChange={handleChange}
              />
              <select name="breeds" id="race" onChange={handleChange}>
            {options.map((breed) => {
              return (
                <option id={breed.id} key={breed.id}>
                  {breed.name}
                </option>
              );
            })}
          </select>
              <input type="submit" value="Send" />
            </form>
            <br/>
            
          </>
        )}
        <p>{errorUser}</p>
      </div>
    );
  }

  export default User;