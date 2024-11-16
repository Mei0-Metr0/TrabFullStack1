import React from "react";
import PokemonGallery from "./components/PokemonGallery";
import PokemonDisplay from "./components/PokemonDisplay";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="container">
      <PokemonDisplay />
      <PokemonGallery />
    </div>
  );
}

export default App;
