import { Card } from "./card";

class Deck {
    private first: Card;

    constructor() {
        // create new deck with empty cards
        this.first = new Card();
        for (let i = 0; i < 7; i++) {
            this.addCard(new Card());
        }
    }

    private addCard(card: Card) {
        let current: Card = this.first;
        while (current.next !== undefined) {
            current = current.next;
        }

        current.next = card;
    }

    private removeFrom(index: number): Card | undefined {
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

    public print() {
        let index = 0;
        let current: Card = this.first;
        while (current.next !== undefined) {
            if (index < 4) {
                console.log("\x1b[32m", `Card: ${current.name} - cost: ${current.cost} elixer`);
            } else {
                console.log("\x1b[31m", `Card: ${current.name} - cost: ${current.cost} elixer`);
            }
            current = current.next;
            index++;
        }
        console.log("\x1b[31m", `Card: ${current.name} - cost: ${current.cost} elixer`);
    }


    public playCard(card: Card) {
        console.log("\x1b[0m", `\n==== Play ${card.name} ====\n`)

        // first check if card exists in first 4 cards
        let index: number = 0;
        let unknown_index: number = -1;
        let current: Card | undefined = this.first;
        while (index < 4 && current && current.id !== card.id) {
            if (current && current.id === 0) unknown_index = index;
            current = current.next;
            index++;
        }

        if (index < 4) {
            // move existing card to the back of the queue
            let removed: Card | undefined = this.removeFrom(index);
            if (!removed) return;

            removed.next = undefined;
            this.addCard(removed);
        } else {
            // replace unknown card with played card and move to back
            let removed: Card | undefined = this.removeFrom(unknown_index);
            if (!removed) return;

            removed.setName(card.name);
            removed.setCost(card.cost);
            removed.next = undefined;

            this.addCard(removed);
        }

    }
}

export default Deck;