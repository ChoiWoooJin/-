import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { DogsModule } from './dogs/dog/dogs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from '../ormconfig';
import { ConfigModule } from '@nestjs/config';
import { StrayDogsModule } from './dogs/straydogs/straydogs.module';
import { LostDogsModule } from './dogs/lostdogs/lost.module';
import { AdoptedDogsModule } from './dogs/adopteddog/adopteddog.module';
import { DeadDogsModule } from './dogs/deaddog/deaddog.module';
import { UrgentDogModule } from './dogs/urgentdog/urgentdog.module';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CacheModule } from '@nestjs/cache-manager';
import { TokenMiddleware } from 'middleware/token.middleware';
import { ReservationModule } from './reservation/reservation.module';
import { EndpointModule } from './endpoint/endpoint.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 60,
    }),
    DogsModule,
    StrayDogsModule,
    LostDogsModule,
    AdoptedDogsModule,
    DeadDogsModule,
    ConfigModule.forRoot({
      envFilePath: ['./development.env'],
    }),
    TypeOrmModule.forRoot(ormconfig),
    LostDogsModule,
    AdoptedDogsModule,
    DeadDogsModule,
    UrgentDogModule,
    AdminModule,
    UserModule,
    AuthModule,
    ReservationModule,
    EndpointModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenMiddleware)
      .forRoutes({ path: 'dog', method: RequestMethod.ALL });
  }
}
