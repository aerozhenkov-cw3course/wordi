import {Injectable} from "@nestjs/common";
import {User} from "../entities/user";
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtService {
    private jwtService: NestJwtService = new NestJwtService({secret: "secret"});

    generateAccessToken({id, email}: User): Promise<string> {
        return this.jwtService.signAsync({id, email}, {expiresIn: '1d'})
    }

    generateRefreshToken({id}: User): Promise<string> {
        return this.jwtService.signAsync({id}, {expiresIn: '1m'})
    }
}
