import { Injectable } from '@nestjs/common';
import { HashProvider } from './hash.provider';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptProvider implements HashProvider {
  public async hash(value: string | Buffer): Promise<string> {
    const salt = await bcrypt.genSalt();

    return await bcrypt.hash(value, salt);
  }

  public async compare(
    value: string | Buffer,
    hashValue: string,
  ): Promise<boolean> {
    return await bcrypt.compare(value, hashValue);
  }
}
