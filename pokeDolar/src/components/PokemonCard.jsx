function PokemonCard() {

    return (
        <div className="col-6 col-md-3 mb-3">
            <div className="card">
                <div className="card-body text-center">
                    <p>Pikachu</p>
                    <img
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
                        alt="Pikachu"
                        style={{ width: "150px", height: "150px" }}
                    />
                </div>
            </div>
        </div>
    );
}

export default PokemonCard;