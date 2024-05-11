import { Module } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { RabbitMqModule } from './rabbit-mq.module';

@Module({
  imports: [RabbitMqModule, MessagingModule],
  providers: [MessagingService],
  exports: [MessagingService],
})
export class MessagingModule {}
