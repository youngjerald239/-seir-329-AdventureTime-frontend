import React, {useEffect, useState} from "react";

import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import Display from "./Display";
import Form from "./Form";

function App() {

// PUT URL in a variable
const url = "http://localhost:4000"

// State to hold list of places/people
const [places, setPlaces] = React.useState([])

// Empty Place - For the create Form
const emptyPlace = {
  name: "",
  img: "",
  description: ""
}

const [selectedPlace, setSelectedPlace] = React.useState(emptyPlace)

// Function to get list of all Places
const getPlaces = () => {
  // make a get request to this url
  fetch(url + "/places/")
  //use .then to take action when the response comes in
  //convert data into js object
  .then((response) => response.json())
  // use the data from the response
  .then((data) => {
    setPlaces(data)
  })
};
useEffect(() => {getPlaces()}, [])

//handleCreate - function for when the create form is submitted
const handleCreate = (newPlace) => {
  fetch(url + "/places", {
    method: "POST", 
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newPlace)
  })
  .then(() => getPlaces())
  
};

//handleUpdate  - function for when the edit form is submitted
const handleUpdate = (place) => {
  fetch(url + "/places/" + place._id, {
    method: "PUT",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify(place)
  })
  .then(() => getPlaces())
}

// function to specify which place/person we are updating
const selectPlace = (place) => {
  setSelectedPlace(place)
}

// deletePlace/Person to delete individual Places/people
const deletePlace = (place) => {
  fetch(url + "/places/" + place._id, {
    method: "delete"
  })
  .then(() => {
    getPlaces()
  })
};

  return (
    <div className="App">
      <h1>Adventure Time LISTING SITE</h1>
      <hr />
      <Link to ="/create">
        <button>Add Place</button>
      </Link>
      <main>
      <Switch>
          <Route
            exact
            path="/"
            render={(rp) => (
              <Display 
              {...rp} 
              places={places} 
              selectPlace={selectPlace}
              deletePlace={deletePlace}
               />
            )}
          />
          <Route
            exact
            path="/create"
            render={(rp) => (
              <Form
                {...rp}
                label="create"
                place={emptyPlace}
                handleSubmit={handleCreate}
              />
            )}
          />
          <Route
            exact
            path="/edit"
            render={(rp) => (
              <Form 
              {...rp} 
              label="update" 
              place={selectedPlace} 
              handleSubmit={handleUpdate} 
              />
            )}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;

