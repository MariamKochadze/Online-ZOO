export interface SignInRequestBody {
    readonly login: string;
    readonly password: string;
}

export interface SignInSuccessResponseBody {
    data: SuccessData;
}

export interface SuccessData {
    access_token: string;
    user: User;
}

export interface User {
    login: string;
    name: string;
    email: string;
}

export interface FailureData {
    error: string;
}
