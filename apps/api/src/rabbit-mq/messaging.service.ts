import { Injectable } from '@nestjs/common';
import { RabbitSubscribe, AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class MessagingService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @RabbitSubscribe({
    exchange: 'nourri',
    routingKey: 'order-queue',
    queue: 'order',
    queueOptions: { channel: 'order-channel' },
  })
  public async handleOrderMessage(message: any) {
    console.log(`Received order message: ${JSON.stringify(message)}`);
  }

  @RabbitSubscribe({
    exchange: 'nourri',
    routingKey: 'dispatch-queue',
    queue: 'dispatch',
    queueOptions: { channel: 'dispatch-channel' },
  })
  public async handleDispatchMessage(message: any) {
    console.log(`Received dispatch message: ${JSON.stringify(message)}`);
  }

  public async publishOrderMessage(order: any) {
    await this.amqpConnection.publish('nourri', 'order-queue', order);
  }

  public async publishDispatchMessage(dispatch: any) {
    await this.amqpConnection.publish('nourri', 'dispatch-queue', dispatch);
  }
}
