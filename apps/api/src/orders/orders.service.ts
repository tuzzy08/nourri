import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
// import { UpdateOrderDto } from './dto/update-order.dto';
import { MessagingService } from 'src/rabbit-mq/messaging.service';

@Injectable()
export class OrdersService {
  constructor(private readonly messagingService: MessagingService) {}
  async create(createOrderDto: CreateOrderDto) {
    await this.messagingService.publishOrderMessage(createOrderDto);
    return 'This action adds a new order';
  }

  // findAll() {
  //   return `This action returns all orders`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} order`;
  // }

  // update(id: number, updateOrderDto: UpdateOrderDto) {
  //   return `This action updates a #${id} order`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} order`;
  // }
}
