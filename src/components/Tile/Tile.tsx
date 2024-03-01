import "./Tile.css";

interface TileProps {
  number: number;
  image: string;
}

const Tile = ({ number, image }: TileProps) => {
  if (number % 2 === 0) {
    return (
      <div className="tile black-tile ">
        {image && (
          <div
            style={{ backgroundImage: `url("${image}")` }}
            className="chess-piece"
          ></div>
        )}
      </div>
    );
  } else {
    return (
      <div className="tile white-tile ">
        {image && (
          <div
            style={{ backgroundImage: `url("${image}")` }}
            className="chess-piece"
          ></div>
        )}
      </div>
    );
  }
};

export default Tile;
