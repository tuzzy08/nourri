import { Module } from '@nestjs/common';
// import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { VendorsModule } from './vendors/vendors.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';
import { RabbitMqModule } from './rabbit-mq/rabbit-mq.module';
import { EventsModule } from './gateways/events.module';
// import { EventsGateway } from './gateways/events.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RabbitMqModule,
    MongooseModule.forRoot(process.env.MONGODB_ATLAS_URL),
    CacheModule.register({
      ttl: 300000,
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    EventsModule,
    OrdersModule,
    VendorsModule,
  ],
})
export class AppModule {}
