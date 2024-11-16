import React, { useState, useEffect } from "react";
import axios from "axios";

function PokemonDisplay() {
  const [dollarPokemon, setDollarPokemon] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);

  useEffect(() => {
    const fetchDollarPokemon = async () => {
      try {
        // Obter a taxa de câmbio do dólar
        const dollarResponse = await axios.get("https://economia.awesomeapi.com.br/last/USD-BRL");
        const exchangeRate = parseFloat(dollarResponse.data.USDBRL.bid);
        const pokemonNumber = Math.round(exchangeRate * 100);

        // Obter os dados do Pokémon correspondente
        const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}/`);
        setDollarPokemon(pokemonResponse.data);
        setExchangeRate(exchangeRate);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchDollarPokemon();
  }, []);

  const capitalize = (name) => name.charAt(0).toUpperCase() + name.slice(1);

  if (!dollarPokemon || !exchangeRate) {
    return <p className="text-center my-4">Carregando...</p>;
  }

  return (
    <div className="my-4 text-center">
      <h2>Pokémon do Valor do Dólar: R${exchangeRate.toFixed(2)}</h2>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${dollarPokemon.id}.png`}
        alt={dollarPokemon.name}
        style={{ width: "400px", height: "400px" }}
      />
      <h3>{capitalize(dollarPokemon.name)}</h3>
    </div>
  );
}

export default PokemonDisplay;
