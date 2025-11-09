import React, { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';

export default function MemeGenerator() {
  const [memeUrls, setMemesUrls] = useState([]);
  const [memeIds, setMemeIds] = useState([]);
  const [memesArray, setMemesArray] = useState([]);
  const [randomUrl, setRandomUrl] = useState();
  const [pngUrl, setPngUrl] = useState('');
  const [mathRandom, setMathRandom] = useState(Math.random());
  const [memeTemplateUrl, setMemeTemplateUrl] = useState();
  const [currentId, setCurrentId] = useState();
  const [topCaption, setTopCaption] = useState('');
  const [bottomCaption, setBottomCaption] = useState('');

  useEffect(() => {
    async function fetchMemes() {
      const response = await fetch('https://api.memegen.link/templates');
      const memes = await response.json();
      const mappedUrls = memes.map((meme) => meme.blank);
      const mappedIds = memes.map((meme) => meme.id);
      setMemesArray(memes);
      setMemeIds(mappedIds);
      setMemesUrls(mappedUrls);
    }
    fetchMemes();
  }, []);
  useEffect(() => {
    function getRandomUrl() {
      const fetchedUrl = memeUrls[Math.floor(mathRandom * memeUrls.length)];
      const correspondingId = memeIds[Math.floor(mathRandom * memeIds.length)];
      //setPngUrl(fetchedUrl);
      if (memeTemplateUrl) {
        setPngUrl(memeTemplateUrl);
      } else {
        setPngUrl(fetchedUrl);
        setCurrentId(correspondingId);
      }
      /*       if (correspondingId) {

      } */
    }
    getRandomUrl();
  }, [memeUrls, mathRandom, memeTemplateUrl]);

  useEffect(() => {
    if (pngUrl) {
      function changeUrlToJpgFormat() {
        const jpgUrl = `${pngUrl.split('.jpg').join(``)}`;
        const captionedUrl = `${jpgUrl}${topCaption ? '/' : ''}${topCaption}${
          bottomCaption ? '/' : ''
        }${bottomCaption}.jpg`;
        setRandomUrl(captionedUrl);
      }
      changeUrlToJpgFormat();
    }
  }, [pngUrl, topCaption, bottomCaption]);

  function downloadImage() {
    saveAs(randomUrl, `${currentId}.jpg`);
  }

  return (
    <div className="rootDiv">
      <div className="title">Random Meme Generator</div>
      <div className="flexContainer">
        <div className="imageContainer">
          <img
            className="memeImg"
            src={randomUrl}
            data-test-id="meme-image"
          ></img>
        </div>
        <div className="buttonContainer">
          <button
            className="selectMemeButton"
            onClick={() => setMathRandom(Math.random())}
          >
            Load meme
          </button>
        </div>
        <label for="meme_template" className="memeTemplateInput">
          <div>Meme identificator:</div>
          <input
            id="meme-template"
            placeholder={memeIds[Math.floor(mathRandom * memeIds.length)]}
            onChange={(e) => {
              let userInput = e.currentTarget.value;
              const obj = memesArray.find((o) => o.id === userInput);
              if (!obj) {
                setMemeTemplateUrl(undefined);
              } else {
                setMemeTemplateUrl(obj.blank);
                setCurrentId(obj.id);
              }
            }}
          ></input>
        </label>
        <label for="top_text">
          <div>Top text:</div>
          <input
            id="top_text"
            onChange={(event) => {
              let topText = event.currentTarget.value;
              topText = topText.replace(/ /g, '_');
              setTopCaption(topText);
            }}
          ></input>
        </label>
        <label for="bottom_text">
          <div>Bottom text:</div>
          <input
            id="bottom_text"
            onChange={(event) => {
              let botText = event.currentTarget.value;
              botText = botText.replace(/ /g, '_');
              setBottomCaption(botText);
            }}
          ></input>
        </label>
        <button className="downloadButton" onClick={() => downloadImage()}>
          Download meme
        </button>
      </div>
    </div>
  );
}
