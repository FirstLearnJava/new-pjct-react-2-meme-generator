import './App.css';
import { useState } from 'react';
import Header from './Header';
import MemeGenerator from './MemeGenerator';

export default function App() {
  const [topCaption, setTopCaption] = useState('');
  const [bottomCaption, setBottomCaption] = useState('');
  return (
    <>
      <div className="App">
        <Header />
        <MemeGenerator topCaption={topCaption} bottomCaption={bottomCaption} />
        <label for="top_text">
          Top text
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
          Bottom text
          <input
            id="bottom_text"
            onChange={(event) => {
              let botText = event.currentTarget.value;
              botText = botText.replace(/ /g, '_');
              setBottomCaption(botText);
            }}
          ></input>
        </label>
      </div>
    </>
  );
}
