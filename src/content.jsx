import React, { useState } from "react";
import axios from "axios";

function Content() {
  const [data, setData] = useState([]);
  const [flavorText, setFlavorText] = useState("");
  const [genderRate, setGenderRate] = useState(0);
  const [userInput, setUserInput] = useState("");

  let arrayData = [];

  async function getData(pokemonName) {
    if (pokemonName != "") {
      try {
        var lowerCaseName = pokemonName.toLowerCase();
        await axios
          .get(" https://pokeapi.co/api/v2/pokemon/" + lowerCaseName)
          .then((res) => setData(res.data));

        await axios
          .get("https://pokeapi.co/api/v2/pokemon-species/" + lowerCaseName)
          .then((res) => {
            setGenderRate((res.data.gender_rate / 8) * 100);

            arrayData = res.data.flavor_text_entries;
            findFlavorText(arrayData, "en");
          });
      } catch (err) {
        alert("there is no pokemon with the name : " + pokemonName);
        console.log(err);
      }
    } else {
      alert("please enter a pokemon name :)");
    }
  }

  function findFlavorText(array, language) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].language.name == language) {
        setFlavorText(array[i].flavor_text);
        break;
      }
    }
  }

  return (
    <div className="text-[#67C193] bg-[#DEFAE8] ">
      <div className="content-container flex flex-col md:flex-row items-center w-screen h-screen max-w-7xl mx-auto justify-between">
        <div className="heading-container flex flex-col gap-10 w-full md:w-1/3 ">
          <h1 className="text-6xl capitalize flex flex-col items-center md:items-start ">
            Choose your <br /> <span className="uppercase">pokemon</span>
          </h1>
          <div className="flex bg-white justify-between p-4 rounded-3xl">
            <input
              className="w-full outline-none"
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={function (e) {
                if (e.key == "Enter") {
                  getData(userInput);
                }
              }}
              placeholder="Enter pokemon name here...(ex. shinx)"
            />
            <button
              className="rounded-3xl bg-[#67C193] text-white px-4 py-2"
              onClick={function () {
                getData(userInput);
              }}
            >
              search
            </button>
          </div>
        </div>
        <div className="result-container grid grid-rows-2 gap-10 text-[#4D8668] w-full md:w-1/2 justify-end ">
          <div className="grid grid-cols-2 gap-10 items-center">
            {data.length != 0 ? (
              <img
                alt="pokemon-official-artwork"
                className="w-full"
                src={data.sprites.other["official-artwork"].front_default}
              />
            ) : null}

            <div className="flex flex-col justify-evenly h-full">
              <h2 className="text-5xl capitalize ">
                {data.length != 0 ? data.name : null}
              </h2>
              <h3 className="text-xl">
                {flavorText.length != 0 ? flavorText : null}
              </h3>
              {data.length != 0 ? (
                <div>
                  {genderRate >= 0 ? (
                    <div className="flex">
                      <div
                        className="text-base bg-blue-500 h-2 rounded-l-3xl"
                        style={{ width: 100 - genderRate + "%" }}
                      ></div>
                      <div
                        className={"text-base bg-pink-500 h-2 rounded-r-3xl"}
                        style={{ width: genderRate + "%" }}
                      ></div>
                    </div>
                  ) : null}
                  {genderRate >= 0 ? (
                    <div className="flex justify-between">
                      <h4>{100 - genderRate} % male</h4>
                      <h4>{genderRate} % female</h4>
                    </div>
                  ) : (
                    <h4>Genderless</h4>
                  )}
                </div>
              ) : null}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10">
            <div>
              <h3 className="text-lg capitalize">
                {data.length != 0 ? "default sprite" : null}
              </h3>
              {data.length != 0 ? (
                <img
                  alt="default-sprite"
                  className="w-2/3"
                  src={data.sprites.front_default}
                />
              ) : null}
            </div>
            <div>
              <h3 className="text-lg capitalize">
                {data.length != 0 ? "shiny sprite" : null}
              </h3>
              {data.length != 0 ? (
                <img
                  alt="shiny-sprite"
                  className="w-2/3"
                  src={data.sprites.front_shiny}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;
