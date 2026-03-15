export interface CameraResponseBody {
    readonly data: CameraDto[];
}

export interface CameraDto {
    readonly id: number;
    readonly petId: number;
    readonly text: string;
}

export interface Camera {
    readonly id: number;
    readonly petId: number;
    readonly text: string;
    readonly img: string | undefined;
    readonly liveCamImg: string;
    readonly liveCamImages: string[];
}
