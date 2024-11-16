import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDollarPokemon } from "../slices/dollarPokemonSlice";

function PokemonDisplay() {
  const dispatch = useDispatch();
  const { dollarPokemon, exchangeRate, status } = useSelector((state) => state.dollarPokemon);

  useEffect(() => {
    dispatch(fetchDollarPokemon());
  }, [dispatch]);

  const capitalize = (name) => name.charAt(0).toUpperCase() + name.slice(1);

  if (status === "pending") {
    return <p>Carregando...</p>;
  }

  if (status === "rejected") {
    return <p>Erro ao carregar os dados. Tente novamente mais tarde.</p>;
  }

  return (
    <div className="my-4 text-center">
      {dollarPokemon && exchangeRate && (
        <>
          <h2>Pokémon do Valor do Dólar: R${exchangeRate.toFixed(2)}</h2>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${dollarPokemon.id}.png`}
            alt={dollarPokemon.name}
            style={{ width: "400px", height: "400px" }}
          />
          <h3>{capitalize(dollarPokemon.name)}</h3>
        </>
      )}
    </div>
  );
}

export default PokemonDisplay;
