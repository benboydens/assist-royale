
import { useState } from 'react';
import { Card } from '../models/card';
import { Deck } from '../models/deck';
import { motion } from "framer-motion"
import CardList from './card-list';
import PickerCard from './card';

export default function Cycle() {
  const [deck, setDeck] = useState<Deck>(new Deck());
  const [cards, setCards] = useState<Array<Card>>(deck.getCards());
  const [champion, setChampion] = useState<Card | null>(null);

  function handleClick(card: Card) {
    deck.playCard(card);

    let champ = deck.getChampion();
    let card_list = deck.getCards();
    setChampion(champ);
    setDeck(deck);

    if (champ !== null) {
      setCards(deck.getCards().concat(champ));
    } else {
      setCards(card_list);
    }
  }

  function resetDeck() {
    const d = new Deck();

    setDeck(d);
    setCards(d.getCards());
    setChampion(null);
  }

  function championGone() {
    deck.championGone();
    setDeck(deck);
    setCards(deck.getCards());
    setChampion(null);
  }

  return (
    <div className="container pt-3">
      <button className="btn btn-dark float-end" onClick={resetDeck}>Reset</button>
      <h3>Deck</h3>
      <div className="deck py-3">
        {
          cards.map((card, index) => (
            <motion.div 
              layout
              initial={{ x: 50 }}
              animate={{ x: -50 }}
              transition={{ duration: 0.2 }}
              className={index >= 4 && card.id !== 0 ? "card-deck-darken" : "card-deck"}
              key={card.id ? card.id : (card.id + '-' + index)}
              onClick={() => { if (card.id) { handleClick(card) } }}>
              <PickerCard card={card} />
              { (champion !== null && index === 7) ? 
                <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="btn btn-dark champ-btn" onClick={championGone}>Gone</motion.button> : null 
              }
            </motion.div>))
        }
      </div>

      <hr />
      <CardList onCardClick={handleClick} />
    </div>
  );
}
