import {TranslationKey, TranslationValue} from "../translation";

export type GetMyDictionary = TranslationKey[];

export type Translate = TranslationValue;

export type Subscribe = "no hui provided" | { pidor: "success", hui_given: string };
