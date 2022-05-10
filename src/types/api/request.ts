import {TranslationKey} from "../translation";

export interface Signup {
    email: string;
    password: string;
}

export interface Signin {
    email: string;
    password: string;
}

export type AddToDictionary = TranslationKey;

export type DeleteFromDictionary = TranslationKey;

export type Translate = TranslationKey;

export interface Subscribe {
    hui: 'hui' | 'her'
}
