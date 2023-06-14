export class Card 
{
    public id: number = 0;
    public name: string = "Unknown";
    public cost: number = 0;
    public next: Card | undefined = undefined;
    public img: string = "/unknown.png";

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
}
