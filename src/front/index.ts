import * as request from '../types/api/request';
import * as response from '../types/api/response';
import axios from "axios";
import * as React from "react";
import * as ReactDOM from "react-dom";


const apiUrl = axios.create({
    baseURL: 'http://localhost:3000/'
});

async function main() {
    const lang = 'en-ru';
    const word = 'example';

    const res: response.Translate = await axios.get<response.Translate>('http://localhost:3000/translate', {
        data: {
            lang,
            word
        } as request.Translate
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
