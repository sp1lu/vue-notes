import type { Position } from './position.interface';

export class Note {
    private _id: string;
    public text: string;
    public position?: Position;

    constructor(id: string, text: string) {
        this._id = id;
        this.text = text;
    }

    public get id(): string {
        return this._id
    }

    public addPosition(position: Position): Note {
        this.position = position;
        return this;
    }
}