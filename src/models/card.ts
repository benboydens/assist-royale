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

    public setName(name: string) {
        this.name = name;
    }

    public getName(): string {
        return this.name
    }

    public setCost(cost: number) {
        this.cost = cost;
    }

    public getCost(): number {
        return this.cost;
    }

    public setImg(url: string) {
        this.img = url;
    }

    public getImg(): string {
        return this.img;
    }

    public isChampion(): boolean {
        return this.rarity.toLowerCase() === "champion";
    }
}
