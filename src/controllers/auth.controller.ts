import {Body, Controller, Get, HttpStatus, Inject, Post, Req, Res, UseGuards} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../entities/user";
import {Repository} from "typeorm";
import * as bcrypt from 'bcrypt';
import * as request from '../types/api/request';
import * as response from '../types/api/response';
import {Tokens} from "../types/token";
import {Response} from "express";
import {JwtService} from "../services/jwt.service";
import {AuthGuard} from "@nestjs/passport";

const salt = 5;

@Controller()
export class AuthController {
    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User>,
        private jwtService: JwtService
    ) {}


    // TODO: only for dev
    @Get('/all')
    all(): Promise<User[]> {
        return this.userRepo.find();
    }

    @Post('/signup')
    @UseGuards()
    async signup(
        @Body() {email, password},
        @Res() res: Response<response.SignUp>
    ): Promise<any> {

        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser: User = await this.userRepo.save(
            {
                email,
                password: hashedPassword
            }
        )

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.generateAccessToken(newUser),
            this.jwtService.generateRefreshToken(newUser)
        ])

        return res
            .status(HttpStatus.OK)
            .send({
                accessToken,
                refreshToken
            })
    }

    @Post('/login')
    @UseGuards()
    async login(
        @Body() {email, password},
        @Res() res: Response<response.Login>
    ): Promise<any> {

        const foundUser: User | null  = await this.userRepo.findOne({
            where: {
                email,
            }
        })

        if (
            !foundUser ||
            ! await bcrypt.compare(password, foundUser.password)
        ) {
            return res
                .status(HttpStatus.UNAUTHORIZED)
                .send()
        }

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.generateAccessToken(foundUser),
            this.jwtService.generateRefreshToken(foundUser)
        ])

        return res
            .status(HttpStatus.OK)
            .send({
                accessToken,
                refreshToken
            })
    }

    @Get('login-with-google')
    @UseGuards(AuthGuard('google'))
    async signInWithGoogle() {}

    @Get('auth/google/callback')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req, @Res() res: Response<response.SignUp>) {
        const { email } = req.user;
        const newUser = await this.userRepo.save(
            {
                email
            }
        )

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.generateAccessToken(newUser),
            this.jwtService.generateRefreshToken(newUser)
        ])

        return res
            .status(HttpStatus.OK)
            .send({
                accessToken,
                refreshToken
            })
    }

    @Get('login-with-vk')
    @UseGuards(AuthGuard('vk'))
    async signInWithVk() {}

    @Get('auth/vk/callback')
    @UseGuards(AuthGuard('vk'))
    async vkAuthRedirect(@Req() req, @Res() res: Response<response.SignUp>) {
        const { email } = req.user;
        const newUser = await this.userRepo.save(
            {
                email
            }
        )

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.generateAccessToken(newUser),
            this.jwtService.generateRefreshToken(newUser)
        ])

        return res
            .status(HttpStatus.OK)
            .send({
                accessToken,
                refreshToken
            })
    }
}
