import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { CoreModule } from './core/core.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { RecipesModule } from './recipes/recipes.module';

@Module({
  imports: [
    AuthModule,
    CoreModule,
    UsersModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: configService.dbType as any,
        host: configService.dbHost,
        port: configService.dbPort,
        username: configService.dbUsername,
        password: configService.dbPassword,
        database: configService.dbName,
        entities: [__dirname + '/data/entities/*{.ts,.js}'],
        // subscribers: ['./src/common/subscribers/*.ts'],
        // synchronize: true,
      }),
    }),
    ProductsModule,
    RecipesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
