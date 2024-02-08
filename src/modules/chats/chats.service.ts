import { Injectable } from '@nestjs/common';
import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase';

@Injectable()
export class ChatsService {

    constructor(
        @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
    ) { }

    async createChatRoom(chatRoomId: string, chatMapRoom: any): Promise<any> {
        return await this.firebase.firestore
            .collection('chat_rooms')
            .doc(chatRoomId)
            .set(chatMapRoom);
    }

    async getConversationMessages(chatRoomId: string): Promise<any> {
        const chatsFind = await this.firebase.firestore
            .collection('chat_rooms')
            .doc(chatRoomId)
            .collection('chats')
            .orderBy('timestamp')
            .get();

        return chatsFind.docs.map((doc) => doc.data());
    }

    async setConversationMessages(chatRoomId: string, messageMap: any): Promise<any> {
        return await this.firebase.firestore
            .collection('chat_rooms')
            .doc(chatRoomId)
            .collection('chats')
            .add(messageMap);
    }
}
