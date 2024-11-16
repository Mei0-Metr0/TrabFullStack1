import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPokemonNames } from "../slices/pokemonSlice";
import PokemonCard from "./PokemonCard";
import Pagination from "./Pagination";

function PokemonGallery() {
  const dispatch = useDispatch();
  const { allPokemonNames, currentPage, limit } = useSelector((state) => state.pokemon);

  useEffect(() => {
    if (allPokemonNames.length === 0) {
      dispatch(fetchAllPokemonNames());
    }
  }, [dispatch, allPokemonNames]);

  const capitalize = (name) => name.charAt(0).toUpperCase() + name.slice(1);

  const startIndex = (currentPage - 1) * limit;
  const paginatedPokemon = allPokemonNames.slice(startIndex, startIndex + limit);

  return (
    <div>
      <div className="row mt-4">
        {paginatedPokemon.length === 0 ? (
          <p>Carregando...</p>
        ) : (
          paginatedPokemon.map((pokemonName, index) => {
            const number = startIndex + index + 1; // Calcula o número do Pokémon
            const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${number}.png`;
            return <PokemonCard key={number} name={capitalize(pokemonName)} imageUrl={imageUrl} number={number} />;
          })
        )}
      </div>
      <Pagination />
    </div>
  );
}

export default PokemonGallery;
