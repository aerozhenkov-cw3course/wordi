import {Module} from '@nestjs/common';
import {TranslationController} from '../controllers/translation.controller';

@Module({
    imports: [],
    controllers: [TranslationController],
})
export class TranslationModule {}
