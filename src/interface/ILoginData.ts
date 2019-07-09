export interface ILoginData {
    loginStatus: boolean;
    profileData: IUserData|Object;
    errors: string[];
}

export interface IUserData {
    name: string;
    email: string;
    refreshToken: string;
}

export interface ILoginCredentials {
    email: string;
    password: string;
}
