import React from "react";
import "./listComponent.css";
import { CardComponent } from "./cardComponent";
const houses = [
  {
    id: 1,
    title: "House Title 1",
    excerpt: "This is the excerpt 1",
    price: 111,
  },
  {
    id: 2,
    title: "House Title 2",
    excerpt: "This is the excerpt 2",
    price: 222,
  },
  {
    id: 3,
    title: "House Title 3",
    excerpt: "This is the excerpt 3",
    price: 333,
  },
];
export const ListComponent = () => {
  return (
    <section className="wrapper">
      <div className="container-fostrap">
        <div>
          <h1 className="heading">Houses for You</h1>
          <hr />
        </div>
        <div className="content">
          <div className="container">
            <div className="row">
              {houses.map((house) => {
                return (
                  <div className="col-xs-12 col-sm-4" key={house.id}>
                    <CardComponent houseProp={house} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
