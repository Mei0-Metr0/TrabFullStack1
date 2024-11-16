import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../slices/pokemonSlice";

function Pagination() {
  const dispatch = useDispatch();
  const { currentPage, totalPages } = useSelector((state) => state.pokemon);

  const handlePrevious = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  return (
    <div className="d-flex justify-content-between mt-3 mb-4">
      <button
        className="btn btn-primary"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        Anterior
      </button>
      <span>Página {currentPage} de {totalPages}</span>
      <button
        className="btn btn-primary"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Próximo
      </button>
    </div>
  );
}

export default Pagination;
