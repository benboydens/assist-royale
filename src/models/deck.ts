import { Card } from "./card";

export class Deck {
    private first: Card;
    private length: number = 7;
    private champion: Card | null = null;

    constructor()
    {
        // create new deck with empty cards
        this.first = new Card();
        for (let i = 0; i < 7; i++) {
            this.addCard(new Card());
        }
    }

    private addCard(card: Card)
    {
        let current: Card = this.first;
        while (current.next !== undefined) {
            current = current.next;
        }

        current.next = card;
    }

    private removeFrom(index: number): Card | undefined
    {
        let curr: Card | undefined = this.first;
        let prev: Card | undefined;

        if (index === 0) {            
            if (!curr.next) return;
            this.first = curr.next;
        } else {
            let i = 0;
            while (i < index) {
                if (!curr) return;

                i++;
                prev = curr;
                curr = curr.next;
            }

            if (!prev) return;
            prev.next = curr?.next;
        }

        return curr;
    }

    public print()
    {
        let index = 0;
        let current: Card = this.first;
        while (current.next !== undefined) {
            if (index < 4) {
                console.log("\x1b[32m", `Card: ${current.name} - cost: ${current.cost} elixer - index: ${index}`);
            } else {
                console.log("\x1b[31m", `Card: ${current.name} - cost: ${current.cost} elixer - index: ${index}`);
            }
            current = current.next;
            index++;
        }
        console.log("\x1b[31m", `Card: ${current.name} - cost: ${current.cost} elixer - index: ${index}`);
    }

    private cardInDeck(card: Card): boolean
    {
        let current: Card = this.first;
        while (current.next !== undefined) {
            if (current.id === card.id) {
                return true;
            }
            current = current.next;
        }

        return current.id === card.id;
    }

    private firstUnknownIndex(): number
    {
        let index: number = 0;
        let current: Card | undefined = this.first;
        while (index < 4 && current) {
            if (current.id === 0) {
                return index;
            }
            current = current.next;
            index++;
        }

        return -1;
    }

    public playCard(card: Card)
    {
        // We can only play a champion once
        if (card.isChampion() && this.champion !== null) {
            return; 
        } 


        // first check if card is in hand (exists in first 4 cards)
        let index: number = 0;
        let current: Card | undefined = this.first;
        while (index < 8 && current && current.id !== card.id) {
            current = current.next;
            index++;
        }

        if (this.cardInDeck(card)) {
            if (index < 4) {
                // move existing card to the back of the queue
                let removed: Card | undefined = this.removeFrom(index);
                if (!removed) return;

                removed.next = undefined;

                if (!removed.isChampion()) {
                    this.addCard(removed);
                } else {
                    this.champion = removed;
                }
            } else {
                // do nothing since card is not in hand
                console.log('Card not in hand');
            }
        } else {

            // We can only play a champion once
            if (card.isChampion() && this.deckHasChampion()) {
                return;
            } 

            // replace unknown card with played card and move to back
            let unknown_index = this.firstUnknownIndex();
            if (unknown_index < 0 || unknown_index > 3) return;

            let removed: Card | undefined = this.removeFrom(unknown_index);
            if (!removed) return;

            removed.id = card.id;
            removed.cost = card.cost;
            removed.name = card.name;
            removed.rarity = card.rarity;
            removed.type = card.type;
            removed.img = card.img;
            removed.next = undefined;

            if (!removed.isChampion()) {
                this.addCard(removed);
            } else {
                this.champion = removed;
            }
        }
    }

    public getCards(): Array<Card>
    {
        let cards: Array<Card> = []
        let current: Card = this.first;

        while (current.next !== undefined) {
            cards.push(current);
            current = current.next;
        }
        cards.push(current);

        return cards;
    }

    public getChampion(): Card | null
    {
        return this.champion;
    }

    public championGone()
    {
        let last: Card | undefined = this.removeFrom(6);

        if (last !== undefined) {
            if (this.champion !== null) {
                this.addCard(this.champion);
            }
            this.addCard(last);
            this.champion = null;
        } else {
            console.error('ERROR with champion, couldn\'t switch last card');
        }
    }

    private deckHasChampion()
    {
        if (this.champion !== null) {
            return true; 
        } 

        let current: Card = this.first;
        while (current.next !== undefined) {
            if (current.isChampion()) {
                return true;
            }
            current = current.next;
        }

        if (current.isChampion()) {
            return true;
        }

        return false;
    }
}
