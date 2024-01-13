import Container from "../components/ui/container";
import PetCard from "../components/pet-card";
import petsGroup from "../components/data/petsData.json";

function Adoption() {
  return (
    <>
      <Container containerClasses="flex row">
        {petsGroup.results.map((pet, index) => (
          <PetCard pet={pet} key={index} />
        ))}
      </Container>
    </>
  );
}

export default Adoption;
