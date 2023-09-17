export class Card 
{
    // Next card in the list
    public next: Card | undefined = undefined;

    // Card properties
    public id: number = 0;
    public name: string = "Unknown";
    public cost: number = 0;
    public img: string = "/unknown.png";
    public rarity: string = "unknown";
    public type: string = "unknown";

    public isChampion(): boolean {
        return this.rarity.toLowerCase() === "champion";
    }
}
