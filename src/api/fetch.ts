import axios from "axios";
import { Card } from "../models/card";

const url: string = 'https://royaleapi.github.io/cr-api-data/json/cards.json';
// const image_url: string = '/v1/cards';

interface JSON_Card {
    id: number,
    description: string,
    key: string,
    name: string,
    sc_key: string,
    elixir: number,
    type: string,
    rarity: string,
    arena: number 
}


export default async function initialize_cards(): Promise<Array<Card>> {

    // fetch all info about the cards and create Card objects with them.
    try {
        let cards: Array<Card> = [];
        const { data } = await axios.get(url);
        for (let item of data) {
            let json_card: JSON_Card = item;

            // create card object from JSON response
            let card: Card = new Card();
            card.id   = json_card.id;
            card.name = json_card.name;
            card.cost = json_card.elixir;
            card.img  = `https://cdn.royaleapi.com/static/img/cards-150/${json_card.key}.png`;
            card.rarity = json_card.rarity;
            card.type = json_card.type;

            cards.push(card);
        }
        return cards;
    } catch (error) {
        console.error(error);
    }
    return [];
}
