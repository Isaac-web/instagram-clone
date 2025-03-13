import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class HashProvider {
  public abstract hash(value: string | Buffer): Promise<string>;

  public abstract compare(
    value: string | Buffer,
    hashValue: string,
  ): Promise<boolean>;
}
