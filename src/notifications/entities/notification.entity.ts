import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { NotificationType } from '../enums/notification-type.enum';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: NotificationType,
    default: NotificationType.DEFAULT,
    nullable: false,
  })
  type: NotificationType;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
  })
  subject: string;

  @Column({
    type: 'varchar',
    length: 512,
    nullable: false,
  })
  content: string;

  @Column({
    type: 'bool',
    default: false,
    nullable: false,
  })
  read: boolean;

  @ManyToOne(() => User, (user) => user.notifications, { onDelete: 'CASCADE' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
