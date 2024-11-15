import axios from "axios";

export const fetchPokemonList = async (offset = 0, limit = 20) => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  return response.data.results;
};
