import PropTypes from "prop-types";
import Card from "./ui/card.jsx";
import Carousel from "./ui/carousel.jsx";

function PetCard({ pet }) {
  return (
    <Card title={pet.name} cardClass="col-lg-4">
      <Carousel photos={pet.pet_photos} />
      <p>{pet.specie}</p>
      <p>{pet.age}</p>
      <p>{pet.size}</p>
    </Card>
  );
}

export default PetCard;

PetCard.propTypes = {
  pet: PropTypes.object,
  name: PropTypes.string,
  photos: PropTypes.array,
  description: PropTypes.string,
};
