import { Card } from '../models/card';

export default function PickerCard({ card }: { card: Card }) {
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