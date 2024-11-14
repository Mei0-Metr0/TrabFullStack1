function PokemonCard({ name, imageUrl }) {
    return (
      <div className="col-6 col-md-3 mb-3">
        <div className="card">
          <div className="card-body text-center">
            <p>{name}</p>
            <img src={imageUrl} alt={name} style={{ width: "150px", height: "150px" }} />
          </div>
        </div>
      </div>
    );
  }
  
  export default PokemonCard;
  