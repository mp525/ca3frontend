import React, { useEffect, useState } from "react";
import facade from "./apiFacade";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function FetchFact() {
    const [dto, setDTO] = useState({ name: "...", address: "...", phone: "..." });
  
    useEffect(() => {
      facade.fetchDefault(setDTO);
    }, []);
  
    return (
      <div style={{ backgroundColor: "#F5F5DC" }} align="center">
        <Card>
          <Card.Body>
            <Card.Title>
        <h3>Random fact sent in by {dto.name}!</h3>
        </Card.Title>
        <Card.Text>
        Did you know that {dto.data}
        </Card.Text>
        </Card.Body>
        </Card>
        <br />
        <h4>Persons personal info: </h4>
        <p>{dto.name}</p>
        <p>Address: {dto.address}</p>
        <p>Phone: {dto.phone}</p>
      </div>
    );
  }

  export default FetchFact;