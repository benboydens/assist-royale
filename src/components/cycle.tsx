
import { useState } from 'react';
import { Card } from '../models/card';
import { Deck } from '../models/deck';
import CardList from './card-list';
import PickerCard from './card';

export default function Cycle() {
	const [deck, setDeck] = useState<Deck>(new Deck());
	const [cards, setCards] = useState<Array<Card>>(deck.getCards());

	function handleClick(card: Card) {
		deck.playCard(card)
		setDeck(deck);
		setCards(deck.getCards());
	}

	function resetDeck() {
		const d = new Deck();

		setDeck(d);
		setCards(d.getCards());
	}

	return (
        <div className="container pt-3">
            <button className="btn btn-dark float-end" onClick={resetDeck}>Reset</button>
            <h3>Deck</h3>
            <div className="deck py-3">
            {
                cards.map((card, index) => (
                <div
                    className={index >= 4 && card.id !== 0 ? "card-deck-darken" : "card-deck"} 
                    key={card.id + '-' + index} 
                    onClick={() =>{ if (card.id) { handleClick(card)} } }>
                        <PickerCard card={card} />
                </div>))
            }
            </div>
            <hr />
            <CardList onCardClick={handleClick} />
        </div>
	);
}
