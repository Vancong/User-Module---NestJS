import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { ConfigModule,ConfigService } from '@nestjs/config';
import {TypeOrmModule} from "@nestjs/typeorm";
import databaseConfig from './config/database.config';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
       isGlobal: true,
       load: [databaseConfig],
    }),

    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: async (configService: ConfigService) =>({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        synchronize: true,
        autoLoadEntities: true,
        logging:true
      })
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
