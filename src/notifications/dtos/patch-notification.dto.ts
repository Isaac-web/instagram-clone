import { PartialType } from '@nestjs/swagger';
import { CreateNotificationDto } from './create-notification.dto';

export class PatchNotificationDto extends PartialType(CreateNotificationDto) {}
