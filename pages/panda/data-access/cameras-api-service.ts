import { petImagePaths } from '../constants/image';
import { Camera, CameraDto, CameraResponseBody } from '../models/camera-model';
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
            return result.data.map((camera) => this.mapToCameras(camera));
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    private mapToCameras(cameraDto: CameraDto): Camera {
        const image = petImagePaths.find((img) => img.petId === cameraDto.petId) ?? petImagePaths[0];
        return {
            id: cameraDto.id,
            text: cameraDto.text,
            petId: cameraDto.petId,
            img: image.path,
            liveCamImg: image.liveCamImage,
            liveCamImages: image.liveCamImages,
        };
    }
}
