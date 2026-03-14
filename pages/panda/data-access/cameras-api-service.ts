import { Camera, CameraResponseBody } from '../models/animal-model';
import { ApplicationConfiguration } from './../../../config/configuration';

export class CamerasApiService {
    constructor(private readonly configuration: ApplicationConfiguration) {}

    public async fetchCameras(): Promise<Camera[] | undefined> {
        try {
            const response = await fetch(`${this.configuration.apiUrl}/cameras`);

            if (!response.ok) {
                throw new Error('Internal server error');
            }

            const result = (await response.json()) as CameraResponseBody;
            return result.data;
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }
}
