import { Card } from '../models/card';

export default function PickerCard({ card, noClick = false }: { card: Card, noClick?: boolean }) {
	return (
    <div className='position-relative'>
		  <img className='card-img' src={card.img} alt={card.name} style={{ 'cursor': (noClick ? 'unset' : 'pointer') }} />
      {
        (card.id !== 0 && !noClick) ? (
          <div className='elixir'>
            <img className='elixir-icon' src='elixir.png' alt='' />
            <div className='elixir-cost'>{card.cost}</div>
          </div>
        ) : null
      }
    </div>
	);
}