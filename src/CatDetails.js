import React, { useEffect, useState } from "react";
import { Card, Table, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import facade from "./apiFacade";


function CatDetails({ cat }) {
    const [catPicBody, setCatPicBody] = useState([]);
    //const [picUrl, setPicUrl] = useState([]);
   

    useEffect(() => {
        //facade.getBreedPicture(cat.id, setCatPicBody);
        
        //console.log("Cat pic body : " + catPicBody.map(obj=>obj.url))

        //<img src={catPicBody.map(obj=>obj.url)}></img>
    }, []);

    const getPic = () => {
        console.log(cat.id);
        facade.getBreedPicture(cat.id, setCatPicBody);
        console.log(catPicBody);
    }
 
    return (
      <Card style={{ backgroundColor: "#F0ead6" }}>
        <Card.Body>
        
          <Card.Title>Description</Card.Title>
          <p>{cat.description}</p>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                {cat.alt_names !== "" && (<th>Alt names</th>)}
                <th>Origin</th>
                <th>Life span</th>
                <th>Child friendly</th>
                <th>Dog friendly</th>
                <th>Cat friendly</th>
                <th>Hypoallergenic</th>
                <th>Indoor</th>
                <th>Short legs</th>
                <th>Hairless</th>
                <th>Grooming level</th>
                <th>Health issues</th>
                <th>Shedding level</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{cat.name}</td>
                {cat.alt_names !== "" && (<td>{cat.alt_names}</td>)}
                <td>{cat.origin}</td>
                <td>{cat.life_span} years</td>
                <td>{cat.child_friendly > 1 ? "yes" : "no"}</td>
                <td>{cat.dog_friendly > 1 ? "yes" : "no"}</td>
                <td>{cat.cat_friendly > 1 ? "yes" : "no"}</td>
                <td>{cat.hypoallergenic > 1 ? "yes" : "no"}</td>
                <td>{cat.indoor > 1 ? "yes" : "no"}</td>
                <td>{cat.short_legs > 1 ? "yes" : "no"}</td>
                <td>{cat.hairless > 1 ? "yes" : "no"}</td>
                <td>{cat.grooming}</td>
                <td>{cat.health_issues}</td>
                <td>{cat.shedding_level}</td>
              </tr>
            </tbody>
          </Table>
  
          <p>For more information, visit the wikipedia article: </p>
  
          <p>
            <a href={cat.wikipedia_url} target="_blank">
              Wikipedia article
            </a>
          </p>
          <Button variant="info" onClick={getPic}>Random cat pic</Button>
          <div>
          <img src={catPicBody.map(obj=>obj.url)}></img>
          </div>
        </Card.Body>
      </Card>
    );
  }

  export default CatDetails;