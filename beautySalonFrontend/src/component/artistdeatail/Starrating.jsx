import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Container, Radio, Rating } from "./styleStar";
function Starrating() {
  const [rate, setRate] = useState(0);
  return (
    <Container>
      {[...Array(5)].map((item, index) => {
        const givenRating = index + 1;
        return (
          <label key={index}>
            <Radio
              type="radio"
              value={givenRating}
              onClick={() => {
                setRate(givenRating);
              }}
            />
            <Rating>
              <FaStar
                color={
                  givenRating < rate || givenRating === rate
                    ? "#BFA100"
                    : "rgb(192,192,192)"
                }
              />
            </Rating>
          </label>
        );
      })}
    </Container>
  );
}

export default Starrating;
