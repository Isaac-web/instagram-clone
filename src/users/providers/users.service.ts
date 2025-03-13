import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { PatchUserDto } from '../dtos/patch-user.dto';
import { CreateUserProvider } from './create-user.provider';
import { FindUserProvider } from './find-user.provider';
import { UpdateUserProvider } from './update-user.provider';
import { DeleteUserProvider } from './delete-user.provider';

@Injectable()
export class UsersService {
  constructor(
    private readonly createUserProvider: CreateUserProvider,

    private readonly findUsersProvider: FindUserProvider,

    private readonly updateUserProvider: UpdateUserProvider,

    private readonly deleteUserProvider: DeleteUserProvider,
  ) {}
  public create(createUserDto: CreateUserDto) {
    return this.createUserProvider.create(createUserDto);
  }

  public find() {
    return this.findUsersProvider.findAll();
  }

  public findById(id: number) {
    return this.findUsersProvider.findByIdOrThrow(id);
  }

  public async update(id: number, patchUserDto: PatchUserDto) {
    return this.updateUserProvider.update(id, patchUserDto);
  }

  public delete(id: number) {
    return this.deleteUserProvider.delete(id);
  }
}
