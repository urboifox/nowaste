import './instrument';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { I18nService, I18nValidationPipe } from 'nestjs-i18n';

const prefix = 'api/v1';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();

    app.setGlobalPrefix(prefix);

    // INFO: Validates DTOs and throws I18nValidationException for invalid data.
    app.useGlobalPipes(new I18nValidationPipe({ transform: true, whitelist: true }));

    const i18nService = app.get(I18nService);
    // INFO: Catches all exceptions, injected with I18nService for translations.
    app.useGlobalFilters(new HttpExceptionFilter(i18nService as I18nService));

    const config = new DocumentBuilder().setTitle('Nowaste API').setVersion('1.0').build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(prefix + '/docs', app, documentFactory);

    await app.listen(process.env.PORT || 3000);
}
bootstrap();
