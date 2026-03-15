export interface RegisterRequestBody {
    readonly email: string;
    readonly password: string;
    readonly login: string;
    readonly name: string;
}

export interface SignUpSuccessResponseBody {
    readonly data: SuccessData;
}

export interface SuccessData {
    readonly access_token: string;
    readonly user: User;
}

export interface FailureData {
    readonly error: string;
}

export interface User {
    readonly login: string;
    readonly name: string;
    readonly email: string;
}
