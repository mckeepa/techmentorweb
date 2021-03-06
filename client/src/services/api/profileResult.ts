import { IPhotoConfig, PhotoConfig } from "../config/photoConfig";

export default class ProfileResult {
    public constructor(source: ProfileResult | null = null, private config: IPhotoConfig = new PhotoConfig()) {
        if (source) {
            this.id = source.id;
            this.birthYear = source.birthYear;
            this.firstName = source.firstName;
            this.gender = source.gender;
            this.lastName = source.lastName;
            this.photoId = source.photoId;
            this.photoHash = source.photoHash;
            this.status = source.status;
            this.timeZone = source.timeZone;
            this.yearStartedInTech = source.yearStartedInTech;
        }
        else {
            this.id = <string><any>null;
            this.birthYear = null;
            this.firstName = <string><any>null;
            this.gender = null;
            this.lastName = <string><any>null;
            this.photoId = null;
            this.photoHash = null;
            this.status = <string><any>null;
            this.timeZone = null;
            this.yearStartedInTech = null;
        }
    }

    public id: string;
    public birthYear: number | null;
    public firstName: string;
    public gender: string | null;
    public lastName: string;
    public photoId: string | null;
    public photoHash: string | null;
    public status: string;
    public timeZone: string | null;
    public yearStartedInTech: number | null;    
    
    public get DisplayAge(): string {
        if (!this.birthYear) {
            return "";
        }

        let currentYear = new Date().getFullYear();
        let value = currentYear - this.birthYear;

        return value.toLocaleString();
    }

    public get DisplayGender(): string {
        return this.ToProperCase(this.gender);
    }

    public get DisplayStatus(): string {
        return this.ToProperCase(this.status);
    }

    public get DisplayYearsInTech(): string {
        if (!this.yearStartedInTech) {
            return "";
        }

        let currentYear = new Date().getFullYear();
        let value = currentYear - this.yearStartedInTech;

        if (value < 1) {
            value = 1;
        }

        return value.toLocaleString();
    }

    public get PhotoUri(): string | null {
        if (!this.photoId) {
            return null;
        }

        let uri = this.config.GetPhotoUri(this.id, this.photoId, this.photoHash);

        return uri;
    }

    private ToProperCase(value: string | null): string {
        if (!value) {
            return "";
        }
 
        let first = value[0].toLocaleUpperCase();
        let remainder = value.substr(1).toLocaleLowerCase();

        return first + remainder;
    }
}