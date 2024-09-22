import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { NotificationType } from '../enums/notification-type.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateNotificationDto {
  @ApiProperty({
    description: 'Id of user receiving the notification.',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiPropertyOptional({
    description: 'Type of notification.',
    example: NotificationType.DEFAULT,
  })
  @IsEnum(NotificationType, {
    message: 'Please provide a valid notification type.',
  })
  @IsOptional()
  type: NotificationType;

  @ApiProperty({
    description: 'Title of notification.',
    example: 'New Message',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  subject: string;

  @ApiProperty({
    description: 'Message of the notification.',
    example: 'You have a new message from John Doe',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(512)
  content: string;

  @ApiPropertyOptional({
    description:
      'Indication of whether the user has viewed the nofitication or not.',
    example: 1,
  })
  @IsBoolean()
  @IsOptional()
  read: boolean;
}
