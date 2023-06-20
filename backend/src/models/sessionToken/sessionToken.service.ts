import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { SessionToken, SessionTokenDocument } from './schemas';

@Injectable()
export class SessionTokenService {
  constructor(
    @InjectModel(SessionToken.name)
    private sessionTokenModel: Model<SessionTokenDocument>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private accessSecretKeyToken = this.configService.get('secret_jwt_access');
  private accessExpire = this.configService.get('expire_jwt_access');
  private refreshSecretKeyToken = this.configService.get('secret_jwt_refresh');
  private refreshExpire = this.configService.get('expire_jwt_refresh');

  async generateJwtToken(user) {
    const payload = { user };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.accessSecretKeyToken,
      expiresIn: this.accessExpire,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.refreshSecretKeyToken,
      expiresIn: this.refreshExpire,
    });

    return { accessToken, refreshToken };
  }

  async saveToken(userId: string, refreshToken: string) {
    const token = await this.sessionTokenModel.findOne({ user: userId });

    if (token) {
      token.refreshToken = refreshToken;
      return await token.save();
    }

    return await this.sessionTokenModel.create({ user: userId, refreshToken });
  }

  async removeToken(refreshToken: string) {
    return await this.sessionTokenModel.deleteOne({ refreshToken });
  }

  async findToken(user: string) {
    return await this.sessionTokenModel.findOne({ user });
  }
}
