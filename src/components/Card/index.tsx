import './style.css';

type CardProps = {
  headerText: string;
  imageSource?: string;
  imageAlt?: string;
  index?: number;
  onClick?: (index: number) => void;
};

const Card = ({
  headerText,
  imageSource,
  imageAlt,
  index = 0,
  onClick = () => {},
}: CardProps): JSX.Element => (
  <article className="card" onClick={() => onClick(index)}>
    <header>
      <h2>{headerText.toLowerCase()}</h2>
    </header>
    {imageSource ? (
      <img src={imageSource} alt={imageAlt} />
    ) : (
      <div className="blank-image" />
    )}
  </article>
);

export default Card;
