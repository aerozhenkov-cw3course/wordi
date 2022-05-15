import {Injectable, NestMiddleware} from "@nestjs/common";
import {NextFunction} from "express";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log('Request...');
        console.log(req.headers)
        const [, accessToken] = req.headers['authorization']?.split(' ') || [];

        console.log('accessToken = ' + accessToken)



        // if (!accessToken) next()

        next();
    }
}
