import React, { useState, useEffect } from 'react';
//import * as cheerio from 'cheerio';
//import axios from 'axios';

export default function MemeGenerator() {
  const [memeUrls, setMemesUrls] = useState([]);
  const [randomUrl, setRandomUrl] = useState();

  useEffect(() => {
    async function fetchMemes() {
      const response = await fetch('https://api.memegen.link/templates');
      const memes = await response.json();
      const mappedUrls = memes.map((meme) => meme.blank);
      setMemesUrls(mappedUrls);
    }

    fetchMemes();
  }, []);

  useEffect(() => {
    function getRandomUrl() {
      setRandomUrl(memeUrls[Math.floor(Math.random() * memeUrls.length)]);
    }
    getRandomUrl();
  }, [memeUrls]);

  /*   function setRandomImage() {
    setRandomUrl(memeUrls[Math.floor(Math.random() * memeUrls.length)]); */

  return (
    <>
      <div>Meme Generator</div>
      <img src={randomUrl} height="200" width="250"></img>
      <button
        width="50"
        height="30"
        onClick={() =>
          setRandomUrl(memeUrls[Math.floor(Math.random() * memeUrls.length)])
        }
      ></button>
    </>
  );
}
