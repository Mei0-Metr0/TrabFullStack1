import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPokemonNames } from "../slices/pokemonSlice";
import PokemonCard from "./PokemonCard";

function PokemonGallery() {
  const dispatch = useDispatch();
  const allPokemonNames = useSelector((state) => state.pokemon.allPokemonNames);

  useEffect(() => {
    dispatch(fetchAllPokemonNames());
  }, [dispatch]);

  const capitalize = (name) => name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <div className="row mt-4">
      {allPokemonNames.length === 0 ? (
        <p>Carregando...</p>
      ) : (
        allPokemonNames.map((pokemonName, index) => {
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`;
          return <PokemonCard key={index + 1} name={capitalize(pokemonName)} imageUrl={imageUrl} />;
        })
      )}
    </div>
  );
}

export default PokemonGallery;
