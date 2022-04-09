export interface TranslationKey {
    // example: en-ru
    lang: string;
    word: string;
}

export type TranslationValue = Array<{
    value: string,
    examples: string[]
}>
