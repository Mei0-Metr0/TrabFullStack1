import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPokemonNames } from "../slices/gallerySlice";
import { setTotalPages } from "../slices/paginationSlice";
import { capitalize } from "../utils/stringUtils";
import PokemonCard from "./PokemonCard";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";

function PokemonGallery() {
  const dispatch = useDispatch();
  const { allPokemonNames, status, error } = useSelector((state) => state.gallery);
  const { currentPage, limit } = useSelector((state) => state.pagination);
  const { searchQuery } = useSelector((state) => state.filter);

  useEffect(() => {
    if (allPokemonNames.length === 0) {
      dispatch(fetchAllPokemonNames());
    }
  }, [dispatch, allPokemonNames]);

  // Cria um array com os Pokémon e seus números originais
  const pokemonWithNumbers = allPokemonNames.map((name, index) => ({
    name,
    number: index + 1
  }));

  // Filtra os Pokémon mantendo seus números originais
  const filteredPokemon = pokemonWithNumbers.filter(pokemon => {
    return (
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pokemon.number.toString() === searchQuery
    );
  });

  // Atualiza o número total de páginas baseado nos resultados filtrados
  useEffect(() => {
    const totalFilteredPages = Math.ceil(filteredPokemon.length / limit);
    dispatch(setTotalPages(totalFilteredPages));
  }, [dispatch, filteredPokemon.length, limit]);

  const startIndex = (currentPage - 1) * limit;
  const paginatedPokemon = filteredPokemon.slice(startIndex, startIndex + limit);

  if (status === "pending") {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  if (status === "rejected") {
    return (
      <div className="alert alert-danger text-center my-5" role="alert">
        Erro ao carregar os Pokémon: {error}
      </div>
    );
  }

  return (
    <div>
      <SearchBar />
      <div className="row mt-4">
        {paginatedPokemon.length === 0 ? (
          <p>Nenhum Pokémon encontrado</p>
        ) : (
          paginatedPokemon.map((pokemon) => {
            const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.number}.png`;
            return (
              <PokemonCard
                key={pokemon.number}
                name={capitalize(pokemon.name)}
                imageUrl={imageUrl}
                number={pokemon.number}
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