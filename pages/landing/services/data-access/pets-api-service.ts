import { ApplicationConfiguration } from '../../../../config/configuration';
import { petImagePaths } from '../../constants/images';
import { Pet, PetDto, PetsResponseBody } from '../../models/pet-model';

export class PetsApiService {
    constructor(private readonly configuration: ApplicationConfiguration) {}

    public async fetchPets(): Promise<Pet[] | undefined> {
        try {
            const response = await fetch(`${this.configuration.apiUrl}/pets`);

            if (!response.ok) {
                // TODO: once backend implements better error handling we can update as well.(now we have only 500 status)
                throw new Error('Internal server error');
            }

            const result = (await response.json()) as PetsResponseBody;
            return result.data.map((dto) => this.mapToPet(dto));
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    private mapToPet(petDto: PetDto): Pet {
        return {
            id: petDto.id,
            species: petDto.commonName,
            name: petDto.name,
            description: petDto.description,
            img: petImagePaths.find((img) => img.id === petDto.id)?.path, // TODO: backend needs to add img urls and then we will remove it from here
        };
    }
}
