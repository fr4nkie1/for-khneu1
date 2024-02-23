import { Filial } from "../models/Filial";

export class FilialResponseDto {
    constructor(filial: Filial)
    {
        this.id = filial.id!;
        this.name = filial.name;
        this.location = filial.location;
    }

    id: number;
    name: string;
    location: string;
}