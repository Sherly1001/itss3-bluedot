import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserDocument } from 'src/domain/schemas';
import { UserService } from '../user/user.service';
import { ChatService } from './chat.service';

class ClientInfo {
  socket: Socket;
  user: UserDocument;
}

@WebSocketGateway({
  cors: { origin: '*' },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private readonly logger = new Logger(ChatGateway.name);
  private readonly clients = new Map<string, ClientInfo>();

  constructor(
    private readonly userService: UserService,
    private readonly chatService: ChatService,
  ) {}

  afterInit() {
    this.logger.log('ws is running');
  }

  async handleConnection(client: Socket) {
    try {
      let token = client.handshake.query.token;
      token = Array.isArray(token) ? token[0] : token;
      const user = await this.userService.validateToken(token);

      this.clients.set(client.id, { socket: client, user });
      this.logger.log(`client connected: ${client.id} ${user?._id}`);
    } catch {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    this.clients.delete(client.id);
    this.logger.log(`client disconnected: ${client.id}`);
  }

  @SubscribeMessage('sendMsg')
  async msg(client: Socket, payload: any) {
    const info = this.clients.get(client.id);
    if (!info) {
      client.disconnect();
    }

    const { user: sender } = info;

    const to = payload?.to;
    const content = payload?.content;

    if (!to || !content) {
      client.emit('sendErr', {
        raw: payload,
        err: 'missing content or receiver',
      });
      return null;
    }

    try {
      const chat = sender.adminOfShop
        ? await this.chatService.sendFromShop(
            sender.adminOfShop as string,
            to,
            content,
          )
        : await this.chatService.sendFromUser(
            sender._id.toString(),
            to,
            content,
          );

      const fromShop = (chat as any)?.fromShop?._id;

      for (let [_, { user, socket }] of this.clients) {
        if (
          user._id == to ||
          user.adminOfShop == to ||
          user._id == sender._id ||
          user.adminOfShop == fromShop
        ) {
          socket.emit('msg', chat);
        }
      }
    } catch (err) {
      client.emit('sendErr', {
        raw: payload,
        err: err.toString(),
      });
    }
  }
}
