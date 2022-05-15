import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";

@Injectable()
export class VkStrategy extends PassportStrategy(Strategy, 'vk') {
    constructor() {
        super({
            clientID: process.env.VK_CLIENT_ID,
            clientSecret: process.env.VK_CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/auth/vk/callback',
            scope: ['email']
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        const {name, emails, photos } = profile;
        const user = {
            email: emails[0].value,
        }

        done(null, user)
    }
}
