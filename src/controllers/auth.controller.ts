import {Body, Controller, Get, Inject, Post, UseGuards} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../entities/user";
import {Repository} from "typeorm";

@Controller()
export class AuthController {
    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User>,
    ) {}


    // TODO: only for dev
    @Get('/all')
    all(): Promise<User[]> {
        return this.userRepo.find();
    }

    @Post('/signup')
    @UseGuards()
    create(@Body() {email, password}) {

        return this.userRepo.save({email, password})
    }
}
