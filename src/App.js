import React, { useState } from "react";
import axios from "axios";

function App() {
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [displayWord, setDisplayWord] = useState("");

  const handleInputChange = (e) => {
    setWord(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${process.env.REACT_APP_API_KEY}`
      );

      if (response.data.length > 0) {
        const definitions = response.data.map((item) => item.shortdef[0]);
        const joinedDefinitions = definitions.join(", ");
        setDefinition(joinedDefinitions);
        setDisplayWord(word);
      } else {
        setDefinition("No definition found");
      }
    } catch (err) {
      console.error("ERROR: ", err);
    }
  };

  return (
    <div className="App">
      <h1>Dictionary</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter a word:
          <input
            type="text"
            value={word}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit(e);
              }
            }}
            className="input-field"
          />
        </label>
        <br />
        <button type="submit">Search</button>
      </form>
      {displayWord && <h2>{displayWord}</h2>}
      <p>{definition}</p>
    </div>
  );
}

export default App;
