import { Inject, forwardRef } from '@nestjs/common';
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { OrdersService } from '../orders/orders.service';

@WebSocketGateway({ namespace: '/orders', cors: true })
export class EventsGateway {
  @WebSocketServer() server: Server;

  constructor(
    @Inject(forwardRef(() => OrdersService))
    private readonly ordersService: OrdersService,
  ) {}

  @SubscribeMessage('connectVendor')
  handleVendorConnect(
    @MessageBody() data: { vendorId: string },
    @ConnectedSocket() client: Socket,
  ): void {
    console.log(`Vendor connected: ${data.vendorId}`);
    client.join(data.vendorId); // Join a room named by vendorId
  }

  @SubscribeMessage('confirmOrder')
  async handleConfirmOrder(@MessageBody() order: any): Promise<void> {
    console.log(`Order ${order} confirmed`);
    // await this.ordersService.processOrderConfirmation(order);
  }

  // Function to emit events to specific vendor
  async notifyVendor(vendorId: string, order: any) {
    console.log(`Notifying vendor ${vendorId}`);
    this.server.to(vendorId).emit('orderPlaced', order);
  }
}
