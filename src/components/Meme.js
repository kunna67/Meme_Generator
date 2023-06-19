import React from "react";

export default function Meme() {
  // save the meme-related data as an object called `meme
  const [meme, setMeme] = React.useState({
    topText: "One does not simply",
    bottomText: "walk into Mordor",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });

  // Create a state to mantain all memes images
  const [allMemes, setAllMemes] = React.useState([]);

  // As soon as the Meme component loads the first time, make an API call to "https://api.imgflip.com/get_memes"
  // When the data comes in, save just the memes array part of that data to the `allMemes` state

  // useEffect takes a function as its parameter. If that function
  // returns something, it needs to be a cleanup function. Otherwise,
  // it should return nothing. If we make it an async function, it
  // automatically returns a promise instead of a function or nothing.
  // Therefore, if you want to use async operations inside of useEffect,
  // you need to define the function separately inside of the callback
  // function, as seen below:

  React.useEffect(() => {
    async function getMemes() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setAllMemes(data.data.memes);
    }
    getMemes();
  }, []);

  // Create a function which get a new random meme on button's click
  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    //  update the `meme.randomImage` state to be the random chosen image URL
    setMeme((prevState) => {
      return { ...prevState, randomImage: url };
    });
  }

  // Create a function which gets event from the browser as a parameter
  function handleChange(event) {
    // Destructure event.target object into smaller variables like name and value
    const { name, value } = event.target;
    setMeme((prevMeme) => {
      // Set a new state with old value but dynamically update value of name property (from one form's input)
      return { ...prevMeme, [name]: value };
    });
  }

  return (
    <main>
      <div className="form">
        {/* Name value must be equal to state object names property */}
        <input
          className="form--input"
          type="text"
          name="topText"
          placeholder="Top text"
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          className="form--input"
          type="text"
          name="bottomText"
          placeholder="Bottom text"
          value={meme.bottomText}
          onChange={handleChange}
        />
        <button className="form--button" onClick={getMemeImage}>
          Get a new meme image 📸
        </button>

        <div className="meme">
          <img src={meme.randomImage} alt="meme" className="meme--img" />
          <h2 className="meme--text top">{meme.topText}</h2>
          <h2 className="meme--text bottom">{meme.bottomText}</h2>
        </div>
      </div>
    </main>
  );
}
