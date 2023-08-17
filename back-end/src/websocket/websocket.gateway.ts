import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Server, WebSocket } from 'ws';

@WebSocketGateway(6001)
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  private clients: Record<string, WebSocket> = {};

  async handleConnection(client: Socket) {
    const sessionId = await this.generateSessionID();
    console.log(`Client connected with session ID: ${sessionId}`);
    this.clients[sessionId] = client;
  }

  handleDisconnect(client: WebSocket) {
    const sessionId = this.findSessionIdByClient(client);
    if (sessionId) {
      console.log(`Client disconnected with session ID: ${sessionId}`);
      delete this.clients[sessionId];
    }
  }

  @SubscribeMessage('video')
  handleVideo(
    @ConnectedSocket() client: WebSocket,
    @MessageBody() data: any,
  ): void {
    const buffer = Buffer.from(data, 'base64');
    for (const sessionId in this.clients) {
      if (
        this.clients[sessionId] !== client &&
        this.clients[sessionId].readyState === WebSocket.OPEN
      ) {
        this.clients[sessionId].send(buffer);
      }
    }
  }

  private generateSessionID(): string {
    // Implement your unique session ID generation logic here
    return Math.random().toString(36).substr(2, 10);
  }

  private findSessionIdByClient(client: WebSocket): string | undefined {
    return Object.keys(this.clients).find(
      (sessionId) => this.clients[sessionId] === client,
    );
  }
}
