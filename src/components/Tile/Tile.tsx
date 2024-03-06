import "./Tile.css";

interface TileProps {
  number: number;
  image: string;
  highlight: boolean;
}

const Tile = ({ number, image, highlight }: TileProps) => {
  const className: string = [
    "tile",
    number % 2 === 0 && "black-tile",
    number % 2 !== 0 && "white-tile",
    highlight && "tile-highlight",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className}>
      {image && (
        <div
          style={{ backgroundImage: `url("${image}")` }}
          className="chess-piece"
        ></div>
      )}
    </div>
  );
};

export default Tile;
