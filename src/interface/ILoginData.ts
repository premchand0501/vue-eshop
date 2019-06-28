import { IProfileData } from './IProfileData';

export interface ILoginData{
    loginStatus: boolean,
    profileData: IProfileData|undefined;
}