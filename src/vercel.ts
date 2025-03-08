import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors(); // Enable CORS if needed
    await app.init();

    // Get the HTTP adapter
    const expressApp = app.getHttpAdapter().getInstance();

    // Export handler for serverless
    return expressApp;
}

// Create and export the server
let cachedServer: any;

export const handler = async (req: any, res: any) => {
    if (!cachedServer) {
        cachedServer = await bootstrap();
    }
    return cachedServer(req, res);
};
