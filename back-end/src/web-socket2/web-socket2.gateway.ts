import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, WebSocket } from 'ws';

@WebSocketGateway(6002)
export class WebSocket2Gateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  private clients: Record<string, WebSocket> = {};
  private previousKey;

  async handleConnection(client: WebSocket) {
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
  @SubscribeMessage('command')
  handleMessage(
    @ConnectedSocket() client: WebSocket,
    @MessageBody() payload: any,
  ): void {
    try {
      const parsedPayload = JSON.parse(payload);
      const key = parsedPayload.type;
      console.log(`Received key from client: ${key}`);
      // 메시지 처리 로직을 추가합니다.

      for (const sessionId in this.clients) {
        if (this.clients[sessionId].readyState === WebSocket.OPEN) {
          if (
            JSON.stringify(this.previousKey) !== JSON.stringify(parsedPayload)
          ) {
            this.clients[sessionId].send(JSON.stringify(parsedPayload)); // JSON 형식으로 전송
            // Update the previousKey only if the payload was sent
            this.previousKey = parsedPayload;
          }
        }
      }
    } catch (error) {
      console.error('Error handling message:', error);
      // 오류 처리 로직을 추가합니다.
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
