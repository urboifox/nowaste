import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CoreModule } from './core/core.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [CoreModule, ProductsModule, UsersModule, AuthModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
