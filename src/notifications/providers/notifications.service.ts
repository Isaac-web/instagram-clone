import { FindUserProvider } from './../../users/providers/find-user.provider';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from '../entities/notification.entity';
import { CreateNotificationDto } from './../dtos/create-notification.dto';
import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationsRepository: Repository<Notification>,

    private readonly findUserProvider: FindUserProvider,
  ) {}
  public async create(createNotificationDto: CreateNotificationDto) {
    const user = await this.findUserProvider.findByIdOrThrow(
      createNotificationDto.userId,
    );

    const notification = this.notificationsRepository.create({
      ...createNotificationDto,
      user,
    });

    try {
      return await this.notificationsRepository.save(notification);
    } catch {
      throw new RequestTimeoutException(
        'Cannot send notification at the moment. Please try again later.',
      );
    }
  }

  public async findAll(userId: number) {
    try {
      const notifications = await this.notificationsRepository.find({
        where: {
          user: {
            id: userId,
          },
        },
      });

      return notifications;
    } catch {
      throw new RequestTimeoutException(
        'Cannot retreive notifications at the moment.',
      );
    }
  }

  public async findById(id: number, userId: number) {
    try {
      const notifications = await this.notificationsRepository.findOne({
        where: {
          id,
          user: {
            id: userId,
          },
        },
      });

      if (!notifications)
        throw new NotFoundException(
          'Notifcation with the given id cannot be found.',
        );

      return notifications;
    } catch {
      throw new RequestTimeoutException(
        'Cannot retreive notifications at the moment.',
      );
    }
  }

  public async update(id: number, userId: number) {
    const notification = await this.findById(id, userId);

    notification.read = true;

    try {
      return await this.notificationsRepository.save(notification);
    } catch {
      throw new RequestTimeoutException(
        'Cannot mark notifcation as read at the moment. Please try again later.',
        {
          description: 'Could not connect to the database.',
        },
      );
    }
  }

  public async delete(id: number, userId: number) {
    const notification = await this.findById(id, userId);

    try {
      return await this.notificationsRepository.remove(notification);
    } catch {
      throw new RequestTimeoutException(
        'Cannot mark notifcation as read at the moment. Please try again later.',
        {
          description: 'Could not connect to the database.',
        },
      );
    }
  }
}
