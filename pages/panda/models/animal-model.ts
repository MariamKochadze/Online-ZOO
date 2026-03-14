export interface CameraResponseBody {
    readonly data: Camera[];
}

export interface Camera {
    readonly id: number;
    readonly petId: string;
    readonly text: string;
}
