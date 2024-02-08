import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatsService } from './chats.service';

@Controller('chats')
export class ChatsController {
    constructor(private chatsService: ChatsService) { }

    @Post('create/:room')
    async createChatRoom(@Param('room') room: any, @Body() body: any): Promise<any> {
        return this.chatsService.createChatRoom(room, body);
    }

    @Get(':room')
    async getDetailLocation(@Param('room') room: any): Promise<any> {
        return this.chatsService.getConversationMessages(room);
    }

    @Post(':room')
    async setConversationMessages(@Param('room') room: any, @Body() body: any): Promise<any> {
        return this.chatsService.setConversationMessages(room, body);
    }
}
