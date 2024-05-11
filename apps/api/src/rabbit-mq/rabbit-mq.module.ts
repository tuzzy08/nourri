import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MessagingService } from './messaging.service';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        exchanges: [
          {
            name: 'nourri',
            type: 'direct',
          },
        ],
        uri: configService.get<string>('AMQP_URL'),
        connectionInitOptions: { wait: false },
        channels: {
          'order-channel': {
            prefetchCount: 1,
            // default: true,
          },
          'dispatch-channel': {
            prefetchCount: 1,
          },
        },
        // Declare queues explicitly
        queues: [
          {
            name: 'order',
            routingKey: 'nourri-order',
            exchange: 'nourri',
          },
          {
            name: 'dispatch',
            routingKey: 'nourri-dispatch',
            exchange: 'nourri',
          },
        ],
      }),
    }),
  ],
  providers: [MessagingService],
  exports: [MessagingService],
})
export class RabbitMqModule {}
