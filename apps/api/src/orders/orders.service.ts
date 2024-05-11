import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
// import { UpdateOrderDto } from './dto/update-order.dto';
import { MessagingService } from 'src/rabbit-mq/messaging.service';
import { EventsGateway } from 'src/gateways/events.gateway';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(forwardRef(() => EventsGateway))
    private readonly eventsGateway: EventsGateway,
    private readonly messagingService: MessagingService,
  ) {}

  async create(order: CreateOrderDto) {
    const ordersByVendor = this.groupOrdersByVendor(order);
    ordersByVendor.forEach(async (order) => {
      // Publish the order to the queue
      await this.messagingService.publishOrderMessage(order);
      // Notify the vendor
      this.eventsGateway.notifyVendor(
        order.root_vendor_id as unknown as string,
        order,
      );
    });

    return 'Order created';
  }

  async processOrderConfirmation(order: any) {
    console.log(order);
    return 'Order confirmed';
  }

  private groupOrdersByVendor(order: any): any[] {
    const grouped = {};
    order.items.forEach((item) => {
      const vendorId = item.vendorId;
      if (!grouped[vendorId]) {
        grouped[vendorId] = {
          vendorId: vendorId,
          items: [],
          userId: order.userId,
          orderId: order.orderId,
        };
      }
      grouped[vendorId].items.push(item);
    });
    return Object.values(grouped);
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
