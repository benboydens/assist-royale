import { useState, useEffect } from 'react';
import { Card } from '../models/card';
import PickerCard from './card';
import initialize_cards from '../api/fetch';


export default function CardList({ onCardClick }: { onCardClick: any }) {
  const [cards, setCards] = useState<Array<Card>>([])
  const [rarity, setRarity] = useState<string>("")
  const [type, setType] = useState<string>("")
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
      <h3>Cards</h3>
      <div className='row g-2 mb-3'>
        <div id="rarity-buttons" className='col-12 col-lg-6'>
          <button type="button" className="btn me-1" id="common" onClick={() => setRarity('Common')}>Common</button>
          <button type="button" className="btn me-1" id="rare" onClick={() => setRarity('Rare')}>Rare</button>
          <button type="button" className="btn me-1" id="epic" onClick={() => setRarity('Epic')}>Epic</button>
          <button type="button" className="btn me-1" id="legendary" onClick={() => setRarity('Legendary')}>Legendary</button>
          <button type="button" className="btn me-1" id="champion" onClick={() => setRarity('Champion')}>Champion</button>
          <button type="button" className="btn btn-secondary" id="rarity-off" onClick={() => setRarity('')}>All</button>
        </div>

        <div id="type-buttons" className='col-12 col-lg-6 text-end'>
          <button type="button" className="btn btn-dark me-1" id="troop" onClick={() => setType('Troop')}>Troop</button>
          <button type="button" className="btn btn-dark me-1" id="building" onClick={() => setType('Building')}>Building</button>
          <button type="button" className="btn btn-dark me-1" id="spell" onClick={() => setType('Spell')}>Spell</button>
          <button type="button" className="btn btn-secondary" id="type-off" onClick={() => setType('')}>All</button>
        </div>
        
        <div className="col-12">
          <input type="text" className="form-control me-3" placeholder="Search by name..." aria-label="name-search" aria-describedby="basic-addon1"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>

      <div className="row g-0">
        {
          cards
            .filter(c => !c.isEventCard())
            .filter(c => c.rarity.includes(rarity))
            .filter(c => c.type.includes(type))
            .filter(c => c.name.toLowerCase().includes(name))
            .map((card) => (
              <div className="col-2 col-md-1" onClick={() => updateCards(card)} key={card.id} title={card.name}>
                <PickerCard card={card} />
              </div>
            ))
        }
      </div>
    </>
  );
}
