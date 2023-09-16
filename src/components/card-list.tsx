import { useState, useEffect } from 'react';
import { Card } from '../models/card';
import PickerCard from './card';
import initialize_cards from '../api/fetch';


export default function CardList({ onCardClick }: { onCardClick: any }) {
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
            <h3>Cards</h3>
            <div className="row pt-3 pb-5 g-3">
                <div className='col-12 col-sm-6'>
                    <input type="text" className="form-control me-3" placeholder="Search by name..." aria-label="name-search" aria-describedby="basic-addon1"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div id="rarity-buttons" className='col-12 col-sm-6'>
                    <input type="radio" className="btn-check" name="rarity-options" id="common" onClick={() => setRarity('Common')} />
                    <label className="btn btn-secondary" htmlFor="common">Common</label>

                    <input type="radio" className="btn-check" name="rarity-options" id="rare" onClick={() => setRarity('Rare')} />
                    <label className="btn btn-secondary" htmlFor="rare">Rare</label>

                    <input type="radio" className="btn-check" name="rarity-options" id="epic" onClick={() => setRarity('Epic')} />
                    <label className="btn btn-secondary" htmlFor="epic">Epic</label>

                    <input type="radio" className="btn-check" name="rarity-options" id="legendary" onClick={() => setRarity('Legendary')} />
                    <label className="btn btn-secondary" htmlFor="legendary">Legendary</label>

                    <input type="radio" className="btn-check" name="rarity-options" id="champion" onClick={() => setRarity('Champion')} />
                    <label className="btn btn-secondary" htmlFor="champion">Champion</label>

                    <input type="radio" className="btn-check" name="rarity-options" id="rarity-off" onClick={() => setRarity('')} />
                    <label className="btn btn-secondary" htmlFor="rarity-off">All</label>
                </div>
            </div>

            <div className="row g-0">
                {
                    cards
                        .filter(c => c.img)
                        .filter(c => c.rarity.includes(rarity))
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
