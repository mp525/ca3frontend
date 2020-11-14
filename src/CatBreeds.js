import React, { useEffect, useState } from "react";
import facade from "./apiFacade";
import "bootstrap/dist/css/bootstrap.min.css";
import CatDetails from "./CatDetails";


function CatBreeds() {
    const [options, setOptions] = useState([]);
    //const [id, setId] = useState("");
    const [cat, setCat] = useState({});
  
    useEffect(() => {
      facade.getAllBreeds(setOptions);
    }, []);
  
    const handleChange = (evt) => {
      const target = evt.target;
      const index = target.options.selectedIndex;
      const id = target.options[index].id;
      const tmpCat = options.find((cat) => cat.id === id);
      setCat({ ...tmpCat });
      console.log(cat.id);
    };
  
    const handleSubmit = (evt) => {
      // evt.preventDefault();
      //const tmpCat = options.find(cat => cat.id === id);
      //setCat({...tmpCat});
    };
  
    return (
      <div className="col" style={{ backgroundColor: "#F5F5DC" }} align="center">
        <h3>Cat breeds</h3>
        <p>Lookup information about the different breeds of cat!</p>
        <form>
          <label htmlFor="breeds">Choose a cat breed: </label>
          <select name="breeds" onChange={handleChange}>
            {options.map((breed) => {
              return (
                <option id={breed.id} key={breed.id}>
                  {breed.name}
                </option>
              );
            })}
          </select>
        </form>
        <CatDetails cat={cat} />
      </div>
    );
  }

  export default CatBreeds;