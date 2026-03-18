export interface PetDetailsResponseBody {
    readonly data: PetDetailsDto;
}

export interface PetDetailsDto {
    readonly id: number;
    readonly commonName: string;
    readonly scientificName: string;
    readonly type: string;
    readonly size: string;
    readonly diet: string;
    readonly habitat: string;
    readonly range: string;
    readonly latitude: string;
    readonly longitude: string;
    readonly description: string;
    readonly detailedDescription: string;
}

export interface PetDetails extends PetDetailsDto {
    readonly img: string;
}
