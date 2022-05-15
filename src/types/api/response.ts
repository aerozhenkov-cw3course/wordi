import {TranslationKey, TranslationValue} from "../translation";
import {Tokens} from "../token";

export type GetMyDictionary = TranslationKey[];

export type Translate = TranslationValue;

export type Subscribe = "no hui provided" | { pidor: "success", hui_given: string };

export type SignUp = Tokens;
export type Login = Tokens;
