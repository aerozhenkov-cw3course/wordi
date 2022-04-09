import { Controller } from '@nestjs/common';
import {MessagePattern, Payload} from "@nestjs/microservices";
import {TranslationKey, TranslationValue} from "../types/translation";

@Controller()
export class AppController {
    @MessagePattern('translate')
    getHello(@Payload() {lang, word}: TranslationKey): Promise<TranslationValue> {

        // TODO: написать логику запроса к внешнему сервису перевода, а потом кэширования в redis
        return new Promise<TranslationValue>(resolve => setTimeout(() => {
            resolve([
                {
                    value: 'Перевод 1',
                    examples: ['Тут используется перевод 1', 'Тут перевод 1 тоже используется']
                },
                {
                    value: 'Второй перевод',
                    examples: ['Вот так второй перевод', 'ну вот ещё пример второго перевода']
                }
            ])
        }, 1000));
    }
}
