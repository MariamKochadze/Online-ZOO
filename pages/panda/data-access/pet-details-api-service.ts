import { ApplicationConfiguration } from '../../../config/configuration';
import { petImagePaths } from '../constants/image';
import { PetDetails, PetDetailsResponseBody } from '../models/pet-details-model';

export class PetDetailsApiService {
    constructor(private readonly configuration: ApplicationConfiguration) {}

    public async fetchPetDetails(id: number): Promise<PetDetails | undefined> {
        try {
            const response = await fetch(`${this.configuration.apiUrl}/pets/${id}`);

            if (!response.ok) {
                throw new Error('Internal server error');
            }

            const result = (await response.json()) as PetDetailsResponseBody;

            return {
                ...result.data,
                img:
                    petImagePaths.find((img) => img.petId === result.data.id)?.detailsImgPath ??
                    petImagePaths[0].detailsImgPath,
            };
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }
}
