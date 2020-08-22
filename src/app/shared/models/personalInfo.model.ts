export class PersonalInfo {
    profile: Profile;
    business: Business;
    setting: Setting;
}

export class Profile {
    fullname: string;
    img: string;
    workPosition: string;
    role: string;
}

export class Business {
    id: string;
    name: string;
    about: string;
    logo: string;
}

export class Setting {
    language: string;
    modeTheme: string;
}