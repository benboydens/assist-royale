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

interface icon_URL {
    medium: string
}

interface Item {
    id: number,
    name: string,
    maxLevel: number,
    iconUrls: icon_URL,
}


export default async function initialize_cards(): Promise<Array<Card>> {
    let id_to_img: any = {};

    // Fetch the images of all the cards and map them with the ID's
    try {
        const { data } = await axios.get('./cards.json');
        for (let item of data.items) {
            let card: Item = item;
            id_to_img[card.id] = card.iconUrls.medium;
        }
    } catch (error) {
        console.error(error);
    }

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
            card.img  = id_to_img[json_card.id];

            cards.push(card);
        }
        return cards;
    } catch (error) {
        console.error(error);
    }
    return [];
}
