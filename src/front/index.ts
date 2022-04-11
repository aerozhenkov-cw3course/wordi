import axios from "axios";
import * as React from "react";
import * as ReactDOM from "react-dom";

type TranslationKey = {
    // example: en-ru
    lang: string;
    word: string;
}

type TranslationValue = Array<{
    value: string,
    examples: string[]
}>

const api$ = axios.create({
    baseURL: 'http://localhost:3000/'
});

async function main() {
    const lang = 'en-ru';
    const word = 'example';

    const res: TranslationValue = await axios.get<TranslationValue>('http://localhost:3000/translate', {
        data: {
            lang,
            word
        } as TranslationKey
    }).then((res) => res.data);

    console.group(`${lang.toUpperCase()}: ${word}`)
    res.forEach(({value, examples}) => {
        console.log(value.toUpperCase())
        examples.forEach(console.log)
    })
    console.log(``)
    console.groupEnd();
}

main();
