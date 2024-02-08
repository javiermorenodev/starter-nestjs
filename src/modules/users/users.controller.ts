import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Post()
    async registerUser(@Body() body: any): Promise<any> {
        return this.usersService.registerUser(body);
    }

    @Get()
    async getDetailLocation(): Promise<any> {
        return this.usersService.getAll();
    }

    @Get(':id')
    async getUserById(@Param('id') id: string): Promise<any> {
        return this.usersService.getUserById(id);
    }

    @Get('role/:name')
    async getRoleByCode(@Param('name') name: string): Promise<any> {
        return this.usersService.getRoleByCode(name);
    }
}
