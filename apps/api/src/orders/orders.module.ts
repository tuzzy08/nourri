import { Module, forwardRef } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { RabbitMqModule } from 'src/rabbit-mq/rabbit-mq.module';
import { EventsModule } from 'src/gateways/events.module';

@Module({
  imports: [RabbitMqModule, forwardRef(() => EventsModule)],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
