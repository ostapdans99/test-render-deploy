import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { Model } from 'mongoose';

import { ActionToken, ActionTokenDocument } from './schemas';

@Injectable()
export class ActionTokenService {
  constructor(
    @InjectModel(ActionToken.name)
    private actionTokenModel: Model<ActionTokenDocument>,
  ) {}

  async generateAndSaveToken(userId: string) {
    const token = await this.actionTokenModel.findOne({ user: userId });

    if (token) {
      token.token = randomUUID();
      return await token.save();
    }

    return await this.actionTokenModel.create({
      user: userId,
      token: randomUUID(),
    });
  }

  async findToken(token: string) {
    return await this.actionTokenModel.findOne({ token });
  }

  async deleteToken(token: string) {
    return await this.actionTokenModel.findOneAndDelete({ token });
  }
}
