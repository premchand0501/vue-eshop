import { ProfileData } from './ProfileData';

export interface LoginData{
    loginStatus: boolean,
    profileData: ProfileData|undefined;
}