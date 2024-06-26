import "../App.css";
import { useState, useEffect } from "react";

export default function Cards() {
  const [Image, setImage] = useState([]);
  const [fetchData, setFetchData] = useState(true);
  const [names, setNames] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!fetchData) {
      return;
    }

    let pokemonName = [
      "articuno",
      "zapdos",
      "moltres",
      "dratini",
      "mewtwo",
      "chikorita",
      "cyndaquil",
      "totodile",
      "lugia",
      "ho-oh",
      "celebi",
      "treecko",
      "torchic",
      "mudkip",
      "taillow",
      "surskit",
      "azurill",
      "meditite",
      "electrike",
      "roselia",
      "pikachu",
    ];

    let pokemon = pokemonName.map((name) =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    );
    Promise.all(pokemon)
      .then((responses) =>
        Promise.all(responses.map((response) => response.json()))
      )
      .then((pokemonData) => {
        let newDeck = [];
        for (let data of pokemonData) {
          newDeck.push({
            name: data.species.name,
            url: data.sprites.front_default,
          });
        }

        for (let i = 0; i < newDeck.length; i++) {
          let j = Math.floor(Math.random() * (i + 1));
          [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
        }

        setImage(newDeck);
        setFetchData(false);
      });
  }, [fetchData]);

  function handleClick(e) {
    const name = e.target.getAttribute("data-name");

    setNames((prevNames) => {
      const updatedNames = [...prevNames, name];
      const result = updatedNames.filter(
        (name, index) => updatedNames.indexOf(name) !== index
      );

      result.length === 1 ? console.log("game over") : setScore(score + 1);
      if (result.length === 1) {
        setScore(0);
        setNames([]);
      }
      return updatedNames;
    });
    setFetchData(true);
  }

  return (
    <>
      <div className="container">
        <h1>MATCH CARDS</h1>
        <p>Score: {score}</p>
        <div className="card_container">
          {Image.slice(0, 12).map((card, index) => (
            <div key={index} className="cards" onClick={handleClick}>
              <img
                src={card.url}
                alt="pokemon"
                className="images"
                data-name={card.name}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
