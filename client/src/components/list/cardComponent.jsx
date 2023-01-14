import React, { useState } from "react";
import { ModalComponent } from "../modal/modalComponent";
export const CardComponent = ({ houseProp }) => {
  const [house, setHouse] = useState(houseProp);
  return (
    <div className="card">
      <a className="img-card" href="#">
        <img src="./assets/houses.png" />
      </a>
      <div className="card-content">
        <h4 className="card-title">
          <a href="#">Card title</a>
        </h4>
        <p className="">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
      </div>
      <div className="card-read-more">
        <a href="#" className="btn btn-link btn-block">
          {" "}
          More Info{" "}
        </a>
        <ModalComponent houseProp={house} />
      </div>
    </div>
  );
};
