// import React from 'react';
import './App.css';
import initialize_cards from './api/fetch';
import { useEffect, useState } from 'react';
import { Card } from './models/card';
import { Deck } from './models/deck';


function App() {
  const [deck, setDeck] = useState<Deck>(new Deck());
  const [cards, setCards] = useState<Array<Card>>(deck.getCards());
  
  function handleClick(card: Card) {
    deck.playCard(card)
    setDeck(deck);
    setCards(deck.getCards());
  }

  function resetDeck() {
    console.log("Reset")
    setDeck(new Deck());
    setCards(deck.getCards());
  }
  
  let deckList = cards.map((c, i) => <div className={i >= 4 && c.id !== 0 ? "card-deck-darken" : "card-deck"} key={c.id + '-' + i }><PickerCard card={c}/></div>)

  return (
    <div className="app">
    <header className="app-header container pt-3">
      <button className="btn btn-dark float-end" onClick={() => resetDeck()}>Reset</button>
      <h3>Deck</h3>
      <div className="deck py-3">
        {deckList}
      </div>
      <hr />
      <CardList onCardClick={handleClick} />
    </header>
  </div>
  );
}


function CardList({ onCardClick }: { onCardClick: any }) {
  const [cards, setCards] = useState<Array<Card>>([])
  const [quickPicks, setQuickPicks] = useState<Array<Card>>([])
  
  const getCards = async () => {
    console.log('GET CARDS');
    const all_cards = await initialize_cards();
    setCards(all_cards);
  }

  function updateCards(card: Card) {
    onCardClick(card);

    if (quickPicks.length < 8 && quickPicks.find(c => c.id === card.id) === undefined) {
      setQuickPicks(quickPicks.concat(card));
    }
  }
  
  useEffect(() => {
    getCards()
  }, [])

  const listPicks = quickPicks.map(c => <div className="col-1 card-qp" onClick={() => updateCards(c) } key={c.id}><PickerCard card={c} /></div>);
  const listCards = cards.filter(c => c.img).map(c => <div className="col-2 col-md-1" onClick={() => updateCards(c) } key={c.id}><PickerCard card={c} /></div>);

  return (
    <>

      { quickPicks.length > 0 ? 
      (
        <>
          <h3>Quick Pick</h3>
          <div className="row g-0 py-3">
            {listPicks}
          </div>
          <hr />
        </>
      ) : (<></>)
      }
      <h3>Cards</h3>
      <div className="row g-0">
        {listCards}
      </div>
    </>
  );
}


function PickerCard({ card }: { card: Card }) {
  return (
    <img className="card-img" src={card.img} alt={card.name} />
  );
}

export default App;
