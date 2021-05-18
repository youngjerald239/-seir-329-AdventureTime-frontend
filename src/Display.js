import React from "react";

const Display = (props) => {
// destruct the places from props
  const {places, selectPlace, history} = props

// Returns the JSX for when you have places
  const loaded = () => (
    <div style={{textAlign: "center"}}>
      {places.map((place) => (
        <article key={place._id}>
          <img src={place.img}/>
          <h1>{place.name}</h1>
          <h3>{place.description}</h3>
          <button onClick={() => {
            selectPlace(place)
            history.push("/edit")
          }}>
          edit
          </button>
          <button onClick={() => {
            props.deletePlace(place)
          }}>
            Delete
          </button>
        </article>
      ))}
    </div>
  )

  const loading = () => <h1>Loading</h1>

  return places.length >0 ? loaded(): loading()
};

export default Display;
