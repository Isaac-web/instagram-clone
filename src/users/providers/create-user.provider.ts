import { FindUserProvider } from 'src/users/providers/find-user.provider';
import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { HashProvider } from 'src/auth/providers/hash.provider';
import { GoogleUserData } from 'src/auth/social/google/interfaces/google-user-data.interface';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class CreateUserProvider {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly hashProvider: HashProvider,

    private readonly findUserProvider: FindUserProvider,

    private readonly mailerService: MailerService,
  ) {}

  public async create(createUserDto: CreateUserDto) {
    await Promise.all([
      this.checkDupliateEmail(createUserDto.email),
      this.checkDupliateUsername(createUserDto.username),
    ]);

    let user = this.usersRepository.create({
      ...createUserDto,
      password: await this.hashProvider.hash(createUserDto.password),
    });

    try {
      user = await this.usersRepository.save(user);

      await this.mailerService.sendMail({
        from: 'SimpleSocial Support Team <no-reply@mail.com>',
        to: user.email,
        subject: 'Welcome SimpleSocial',
        template: 'welcome',
        context: { user },
      });

      return user;
    } catch (error) {
      throw new RequestTimeoutException(
        'Cannot create a user at the moment. Please try again later.',
      );
    }
  }

  public async createGoogleUser(googleUserData: GoogleUserData) {
    await this.checkDupliateGoogleId(googleUserData.googleId);

    let user = this.usersRepository.create(googleUserData);

    try {
      user = await this.usersRepository.save(user);

      await this.mailerService.sendMail({
        from: 'SimpleSocial Support Team <no-reply@mail.com>',
        to: user.email,
        subject: 'Welcome SimpleSocial',
        template: 'welcome_oauth',
        context: { user },
      });

      return user;
    } catch {
      throw new RequestTimeoutException(
        'Cannot create a user at the moment. Please try again later.',
      );
    }
  }

  public async checkDupliateEmail(email: string) {
    const user = await this.usersRepository.findOneBy({
      email,
    });

    if (user) throw new BadRequestException('Username is already taken.');
  }
  public async checkDupliateGoogleId(googleId: string) {
    const user = await this.findUserProvider.findByGoogleId(googleId);

    if (user)
      throw new BadRequestException(
        'User with the given google Id already exists.',
      );
  }

  public async checkDupliateUsername(username: string) {
    const user = await this.usersRepository.findOneBy({
      username,
    });

    if (user) throw new BadRequestException('Username is already taken.');
  }
}
