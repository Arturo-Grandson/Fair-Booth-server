import {  PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserDto } from "../dto/user.dto";
import { JwtPayload } from "../interfaces/jwt-payload.interfaces";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";
import { Repository } from 'typeorm';
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ) {

  constructor(
    @InjectRepository(UserEntity)
    private userReposistory: Repository<UserDto>,
    configService: ConfigService
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    })
  }

  async validate( payload: JwtPayload): Promise<UserDto> {

    const { email } = payload

    const user = await this.userReposistory.findOneBy({ email })

    if(!user)
      throw new UnauthorizedException('Token not valid')

    return user;

  }

}