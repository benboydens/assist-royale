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

    public isChampion(): boolean
    {
        return this.rarity.toLowerCase() === "champion";
    }

    public isEventCard(): boolean
    {
        const ids = [26000066, 26000070, 26000071, 26000073, 26000075, 26000078, 26000081, 26000082, 27000014, 28000020];
        return ids.indexOf(this.id) >= 0;
    }
}
