import { ApplicationConfiguration } from '../../../config/configuration';
import { Pet, PetDto, PetsResponseBody } from '../models/pet-model';

export class PetsApiService {
    constructor(private readonly configuration: ApplicationConfiguration) {}

    public async fetchPets(): Promise<Pet[]> {
        const response = await fetch(`${this.configuration.apiUrl}/pets`);
        const body = (await response.json()) as PetsResponseBody;
        const pets = body.data.map((dto) => this.mapToPet(dto));
        return pets;
    }

    private mapToPet(petDto: PetDto): Pet {
        return {
            id: petDto.id,
            species: petDto.commonName,
            name: petDto.name,
            description: petDto.description,
        };
    }
}
