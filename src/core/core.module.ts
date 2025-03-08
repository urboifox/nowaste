import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';

@Global()
@Module({
    imports: [ConfigModule.forRoot(), PrismaModule],
    exports: [PrismaModule, ConfigModule],
})
export class CoreModule {}
