import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors(); // Enable CORS if needed
    await app.init();

    const config = new DocumentBuilder().setTitle('Nowaste API').setVersion('1.0').build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, documentFactory);

    // Get the HTTP adapter
    const expressApp = app.getHttpAdapter().getInstance();

    // Export handler for serverless
    return expressApp;
}

// Create and export the server
let cachedServer: any;

const handler = async (req: any, res: any) => {
    if (!cachedServer) {
        cachedServer = await bootstrap();
    }
    return cachedServer(req, res);
};

export default handler;
