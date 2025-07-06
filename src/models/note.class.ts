import type { Position } from './position.interface';

export class Note {
    private _id: string;
    public text: string;
    public user: string;
    public color?: string;
    public position?: Position;

    constructor(
        id: string,
        text: string,
        user: string,
        color: string = 'yellow',
        position: Position = { top: 50, left: 50 }
    ) {
        this._id = id;
        this.text = text;
        this.user = user;
        this.color = color;
        this.position = position;
    }

    public get id(): string {
        return this._id
    }

    public addPosition(position: Position): Note {
        this.position = position;
        return this;
    }

    public addColor(color: string): Note {
        this.color = color;
        return this;
    }
}