import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDollarPokemon } from "../slices/dollarPokemonSlice";
import { toUpperCaseText } from "../utils/stringUtils";
import './PokemonDisplay.css'

function PokemonDisplay() {
  const dispatch = useDispatch();
  const { dollarPokemon, exchangeRate, status } = useSelector((state) => state.dollarPokemon);

  useEffect(() => {
    dispatch(fetchDollarPokemon());
  }, [dispatch]);

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
        Erro ao carregar os dados. Tente novamente mais tarde.
      </div>
    );
  }

  return (
    <div className="my-4 text-center">
      {dollarPokemon && exchangeRate && (
        <>
          <h2 className="display">
            Pokémon Cotação do dólar em relação ao real: <span className="text-success">R${exchangeRate.toFixed(2)}</span>
          </h2>
          <img
            src={dollarPokemon.sprites.other["official-artwork"].front_default}
            alt={dollarPokemon.name}
            className="img"
          />
          <h3>{toUpperCaseText(dollarPokemon.name)}</h3>
        </>
      )}
    </div>
  );
}

export default PokemonDisplay;
