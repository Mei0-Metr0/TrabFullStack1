import { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";
import axios from "axios";

function PokemonGallery() {
  const [allPokemonNames, setAllPokemonNames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllPokemonNames = async () => {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0");
        setAllPokemonNames(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
        setLoading(false);
      }
    };

    fetchAllPokemonNames();
  }, []);

  const capitalize = (name) => name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <div className="container mt-4">
      <div className="row">
        {loading ? (
          <p>Carregando...</p>
        ) : (
          allPokemonNames.map((pokemon, index) => (
            <PokemonCard
              key={index}
              name={capitalize(pokemon.name)}
              imageUrl={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default PokemonGallery;
