import { Injectable } from '@nestjs/common';
import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase';

@Injectable()
export class UsersService {
    constructor(
        @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
    ) { }


    async registerUser(body: any): Promise<any> {
        const { name, role, token } = body
        return await this.firebase.firestore
            .collection('users')
            .add({ 'name': name, 'role': role, 'token': token });
    }

    async getAll(): Promise<any> {
        ///Consultar usuarios
        const usersFind = await this.firebase.firestore.collection('users').get();
        return usersFind.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    }

    async getUserById(id: string): Promise<any> {
        return await this.firebase.firestore.collection('users').doc(id).get();
    }

    async getRoleByCode(code: string): Promise<any> {
        const roleFind = await this.firebase.firestore
            .collection('codes')
            .where('code', '==', code)
            .get();

        return roleFind.docs.map((doc) => doc.data());
    }
}
