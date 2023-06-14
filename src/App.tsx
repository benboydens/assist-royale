// import React from 'react';
import './App.css';
import initialize_cards from './api/fetch';
import { useEffect, useState } from 'react';
import { Card } from './models/card';

function Deck() {

  const [cards, setCards] = useState(Array<Card>)
  useEffect(() => {
    async function getCards() {
      let all_cards = await initialize_cards();
      setCards(all_cards);
    }
    getCards();
  })

  const listCards = cards.map(c => <div>{c.name}<img src={c.img} alt={c.name}/></div>);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Yo dit is een deck bro
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <div>
          <div>Unknown<img src="/unknown.png" alt="Unknown"/></div>
          {listCards}
        </div>
      </header>
    </div>
  );
}

// function Cardx() {
//   return (
//     <div>
//       <div>Title</div>
//       <img src="" alt="FUCKYOUIKZETWATIKwiLHIER" />
//     </div>
//   );
// }

export default Deck;
