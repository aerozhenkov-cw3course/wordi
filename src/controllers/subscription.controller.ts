import { Controller } from '@nestjs/common';
import {MessagePattern, Payload} from "@nestjs/microservices";
import * as request from '../types/api/request';
import * as response from '../types/api/response';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../entities/user";
import {Repository} from "typeorm";
import {HttpService} from "@nestjs/axios";
import {firstValueFrom, Observable} from "rxjs";
import {AxiosResponse} from "axios";

@Controller()
export class SubscriptionController {
    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User>,
        private httpService: HttpService
    ) {}

    @MessagePattern('subscribe')
    async subscribe(@Payload() {hui}: request.Subscribe): Promise<response.Subscribe> {
        const usersCount = await this.userRepo.count();

        // return to main service that will proxy it to client
        return new Promise<response.Subscribe>(resolve => setTimeout(() => {
            // @тс-игнор – если не компилится из-за строчки, но не злоупотребляй
            // @ts-ignore
            resolve({pidor: "success", hui_given: hui, usersCount})
        }, 1500));
    }

    @MessagePattern('req-to-you-kassa')
    async method2(): Promise<TodoType[]> {
        const url: string = 'https://jsonplaceholder.typicode.com/todos'
        const response$: Observable<AxiosResponse<TodoType[]>> = this.httpService.get(url);

        const response = await firstValueFrom(response$);

        const todos: TodoType[] = response.data;

        return todos
            .slice(0, 3)
            .map(todo => ({
            ...todo,
            pizda: 'pizda'
        }))
    }
}

type TodoType = {
    title: string,
    completed: boolean
}
