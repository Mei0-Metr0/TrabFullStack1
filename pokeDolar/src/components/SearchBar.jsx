// Componente com uma barra de busca para pesquisar Pokemons

import { useDispatch } from "react-redux";
import { setSearchQuery } from "../slices/filterSlice";

function SearchBar() {
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar Pokémon por nome ou número"
        onChange={handleSearchChange}
      />
    </div>
  );
}

export default SearchBar;