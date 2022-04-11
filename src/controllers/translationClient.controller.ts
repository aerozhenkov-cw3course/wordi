import {Body, Controller, Get, Inject, Res, HttpStatus} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import * as request from '../types/api/request';
import * as response from '../types/api/response';
import {timeout, firstValueFrom} from "rxjs";
import {Response} from "express";
import {TranslationValue} from "../types/translation";

@Controller()
export class TranslationClientController {
    constructor(
        @Inject('TRANSLATION_SERVICE') private translationService: ClientProxy,
    ) {}

    @Get('/translate')
    translate(
        @Body() data: request.Translate,
        @Res() res: Response<response.Translate>
    ): Promise<any> {

        const translation$ = this.translationService.send<TranslationValue>('translate', data)
            .pipe(
                timeout(2000)
            )

        return firstValueFrom(translation$)
            .then((value) =>
                res
                    .status(HttpStatus.OK)
                    .send(value)
            )
            .catch(() =>
                res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .send()
            )
    }
}
