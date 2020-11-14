import React, { useEffect, useState } from "react";
import facade from "./apiFacade";
import { Button, Card, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Admin() {
    const [errorAdmin, setErrorAdmin] = useState("");
    const [dataFromServer, setDataFromServer] = useState("");
    const [cats, setCats] = useState([]);
    const [cat, setCat] = useState({});
    const [allCats, setAllCats] = useState([]);
    const [options, setOptions] = useState([]);
  
    useEffect(() => {
      facade
        .fetchDataAdminCats()
        .then((data) => setCats(data))
        .catch((err) => {
          err.fullError.then((err) => {
            setErrorAdmin(err.message);
          });
        });
  
      facade
        .fetchDataAdmin()
        .then((data) => setDataFromServer(data.msg))
        .catch((err) => {
          err.fullError.then((err) => {
            setErrorAdmin(err.message);
          });
        });
  
      fetchAllCats();
      facade.getAllBreeds(setOptions);
    }, []);
  
    const deleteCat = (id) => {
      facade.deleteCat(id);
      fetchAllCats();
      facade.fetchDataAdminCats().then(data => setCats(data));
    };
  
    const fetchAllCats = () => {
      //evt.preventDefault();
      facade.fetchAllCats(setAllCats);
    };
  
    const handleChange = (evt) => {
      const target = evt.target;
      const value = target.value;
      const prop = target.id;
      const tmpCat = { ...cat, [prop]: value };
      setCat(tmpCat);
    };
  
    const handleSubmit = (evt) => {
      evt.preventDefault();
      facade.addCatA(cat);
      fetchAllCats();
      facade.fetchDataAdminCats().then((data) => setCats(data));
    };
  
    return (
      <div style={{ backgroundColor: "#F5F5DC" }} align="center">
        <h3>{dataFromServer}</h3>
        {facade.isAdmin().indexOf("admin") !== -1 && (
          <>
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
            <br />
  
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Race</th>
                  <th>Owner</th>
                </tr>
              </thead>
              <tbody>
                {allCats.map((cat) => (
                  <tr key={cat.id}>
                    <td>{cat.name}</td>
                    <td>{cat.race}</td>
                    <td>{cat.owner}</td>
                    <td>
                      <a
                        href="xx"
                        onClick={(e) => {
                          e.preventDefault();
                          deleteCat(cat.id);
                        }}
                      >
                        delete
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
        <p>{errorAdmin}</p>
      </div>
    );
  }

  export default Admin;