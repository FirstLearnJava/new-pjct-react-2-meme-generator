import React, { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';

export default function MemeGenerator(props) {
  const [memeUrls, setMemesUrls] = useState([]);
  const [memeIds, setMemeIds] = useState([]);
  const [memesArray, setMemesArray] = useState([]);
  const [randomUrl, setRandomUrl] = useState();
  const [pngUrl, setPngUrl] = useState('');
  const [mathRandom, setMathRandom] = useState(Math.random());
  const [memeTemplateUrl, setMemeTemplateUrl] = useState();
  const [currentId, setCurrentId] = useState();

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
        const jpgUrl = `${pngUrl.split('.png').join(``)}`;
        const captionedUrl = `${jpgUrl}${props.topCaption ? '/' : ''}${
          props.topCaption
        }${props.bottomCaption ? '/' : ''}${props.bottomCaption}.jpg`;
        setRandomUrl(captionedUrl);
      }
      changeUrlToJpgFormat();
    }
  }, [pngUrl, props.topCaption, props.bottomCaption]);

  /* function downloadImage() {
    FileSaver.saveAs(randomUrl, `${currentId}.jpg`);
  } */

  return (
    <>
      <div>Meme Generator</div>
      <img
        src={randomUrl}
        height="400"
        width="460"
        data-test-id="meme-image"
      ></img>
      <button onClick={() => setMathRandom(Math.random())}>
        Select random meme
      </button>
      <label for="meme_template">
        Meme template
        <input
          id="meme-template"
          placeholder={memeIds[Math.floor(mathRandom * memeIds.length)]}
          onChange={(e) => {
            let userInput = e.currentTarget.value;
            const obj = memesArray.find((o) => o.id === userInput);
            if (obj) {
              setMemeTemplateUrl(obj.blank);
              setCurrentId(obj.id);
            }
          }}
        ></input>
      </label>
      <button
        onClick={() => {
          saveAs(randomUrl, `${currentId}.jpg`);
        }}
      >
        Download
      </button>
    </>
  );
}
