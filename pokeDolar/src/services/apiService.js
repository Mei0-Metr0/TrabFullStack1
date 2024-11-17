import axios from "axios";

export const fetchPokemonList = async (offset = 0, limit = 20) => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  return response.data.results;
};

export const fetchDollarRate = async () => {
  const response = await axios.get("https://economia.awesomeapi.com.br/last/USD-BRL");
  const exchangeRate = parseFloat(response.data.USDBRL.bid);
  const pokemonNumber = Math.round(exchangeRate * 100);
  return { exchangeRate, pokemonNumber };
};

export const fetchPokemonByNumber = async (number) => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${number}/`);
  return response.data;
};

export const fetchPokemonByType = async (typeId) => {
  const response = await axios.get(`https://pokeapi.co/api/v2/type/${typeId}`);
  return response.data.pokemon;
};