export interface PetsResponseBody {
    readonly data: PetDto[];
}

export interface PetDto {
    readonly id: number;
    readonly commonName: string;
    readonly name: string;
    readonly description: string;
}

export interface Pet {
    readonly id: number;
    readonly species: string;
    readonly name: string;
    readonly description: string;
}
