import { useEffect, useState } from "react";
import "../App.css";

export const Cards = () => {
  const [deck, setDeck] = useState([]);

  useEffect(() => {
    let pokemonNames = [
      "pikachu",
      "bulbasaur",
      "charmander",
      "squirtle",
      "mew",
      "jigglypuff",
    ];
    let promises = pokemonNames.map((name) =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    );
    Promise.all(promises)
      .then((responses) =>
        Promise.all(responses.map((response) => response.json()))
      )
      .then((pokemonData) => {
        let newDeck = [];
        for (let data of pokemonData) {
          newDeck.push(data.sprites.front_default);
          newDeck.push(data.sprites.front_default);
        }

        for (let i = newDeck.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
        }

        setDeck(newDeck);
      });
  }, []);

  return (
    <>
      <h1>MATCH CARDS</h1>
      <div className="card_container">
        {deck.map((card, index) => (
          <div key={index} className="cards">
            <img src={card} alt="pokemon" className="images" />
          </div>
        ))}
      </div>
    </>
  );
};
