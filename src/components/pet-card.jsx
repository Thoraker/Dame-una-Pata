import PropTypes from "prop-types";
import Card from "./ui/card.jsx";
import Carousel from "./";

function PetCard({ pet }) {
  return (
    <>
      <Card title={pet.name}>
        <Carousel photos={pet.photos} />
        <p>{pet.description}</p>
      </Card>
    </>
  );
}

export default PetCard;

PetCard.propTypes = {
  pet: PropTypes.object,
  name: PropTypes.string,
  photos: PropTypes.array,
  description: PropTypes.string,
};
