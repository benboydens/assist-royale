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
		const d = new Deck();

		setDeck(d);
		setCards(d.getCards());
	}

	let deckList = cards.map((c, i) => <div className={i >= 4 && c.id !== 0 ? "card-deck-darken" : "card-deck"} key={c.id + '-' + i} onClick={() =>{ if (c.id) { handleClick(c)} } }><PickerCard card={c} /></div>)

	return (
		<div className="app">
			<header className="app-header container pt-3">
				<button className="btn btn-dark float-end" onClick={resetDeck}>Reset</button>
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
	const [rarity, setRarity] = useState<string>("")
	const [name, setName] = useState<string>("")


	const getCards = async () => {
		console.log('GET CARDS');
		const all_cards = await initialize_cards();
		setCards(all_cards);
	}

	function updateCards(card: Card) {
		onCardClick(card);
	}

	useEffect(() => {
		getCards()
	}, [])

	return (
		<>
			<div className="row pb-5">
				<div className='col'>
					<input type="text" className="form-control me-3" placeholder="Search by name..." aria-label="name-search" aria-describedby="basic-addon1"
						onChange={(e) => setName(e.target.value) }
					/>
				</div>
				<div id="rarity-buttons" className='col'>
          <input type="radio" className="btn-check" name="rarity-options" id="common" onClick={ () => setRarity('Common') }/>
          <label className="btn btn-secondary" htmlFor="common">Common</label>

          <input type="radio" className="btn-check" name="rarity-options" id="rare" onClick={ () => setRarity('Rare') }/>
          <label className="btn btn-secondary" htmlFor="rare">Rare</label>
          
          <input type="radio" className="btn-check" name="rarity-options" id="epic" onClick={ () => setRarity('Epic') } />
          <label className="btn btn-secondary" htmlFor="epic">Epic</label>

          <input type="radio" className="btn-check" name="rarity-options" id="legendary" onClick={ () => setRarity('Legendary') } />
          <label className="btn btn-secondary" htmlFor="legendary">Legendary</label>

          <input type="radio" className="btn-check" name="rarity-options" id="champion" onClick={ () => setRarity('Champion') } />
          <label className="btn btn-secondary" htmlFor="champion">Champion</label>

          <input type="radio" className="btn-check" name="rarity-options" id="rarity-off" onClick={ () => setRarity('') } />
          <label className="btn btn-secondary" htmlFor="rarity-off">All</label>
        </div>
			</div>

			<div className="row g-0">
			{  
				cards
					.filter(c => c.img)
					.filter(c => c.rarity.includes(rarity))
					.filter(c => c.name.toLowerCase().includes(name))
					.map((card)=> (
						<div className="col-2 col-md-1" onClick={() => updateCards(card)} key={card.id} title={card.name}>
							<PickerCard card={card} />
						</div>
					))
			}
			</div>
		</>
	);
}


function PickerCard({ card }: { card: Card }) {
	return (
    <div className='position-relative'>
		  <img className="card-img" src={card.img} alt={card.name} />
      {
        card.id !== 0 ? (
          <>
            <img className="elixer-icon" src="elixer.png" alt="" />
            <div className='elixer-cost'>{card.cost}</div>
          </>
        ) : null
      }
    </div>
	);
}

export default App;
