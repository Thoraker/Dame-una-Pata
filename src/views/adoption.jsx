import Container from "../components/ui/container";
import PetCard from "../components/pet-card";
import { useStore } from "zustand";

function Adoption() {
  const pets = useStore((state) => state.pets);

  return (
    <>
      <Container containerClasses="flex row">
        {pets.map((pet, index) => (
          <PetCard pet={pet} key={index} />
        ))}
      </Container>
    </>
  );
}

export default Adoption;
