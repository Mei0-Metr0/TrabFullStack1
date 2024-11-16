import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPokemonNames } from "../slices/pokemonSlice";
import PokemonCard from "./PokemonCard";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";

function PokemonGallery() {
  const dispatch = useDispatch();
  const { allPokemonNames, currentPage, limit } = useSelector((state) => state.pokemon);
  const { searchQuery } = useSelector((state) => state.filter);

  useEffect(() => {
    if (allPokemonNames.length === 0) {
      dispatch(fetchAllPokemonNames());
    }
  }, [dispatch, allPokemonNames]);

  const capitalize = (name) => name.charAt(0).toUpperCase() + name.slice(1);

  // Filtra os Pokémon baseado na busca
  const filteredPokemon = allPokemonNames.filter((name, index) => {
    const number = index + 1;
    return (
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      number.toString() === searchQuery
    );
  });

  const startIndex = (currentPage - 1) * limit;
  const paginatedPokemon = filteredPokemon.slice(startIndex, startIndex + limit);

  return (
    <div>
      <SearchBar />
      <div className="row mt-4">
        {paginatedPokemon.length === 0 ? (
          <p>Nenhum Pokémon encontrado</p>
        ) : (
          paginatedPokemon.map((pokemonName, index) => {
            const number = filteredPokemon.indexOf(pokemonName) + 1;
            const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${number}.png`;
            return (
              <PokemonCard
                key={number}
                name={capitalize(pokemonName)}
                imageUrl={imageUrl}
                number={number}
              />
            );
          })
        )}
      </div>
      <Pagination />
    </div>
  );
}

export default PokemonGallery;