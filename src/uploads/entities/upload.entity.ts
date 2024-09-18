import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FileType } from '../enums/file-type.enum';

@Entity()
export class Upload {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'enum',
    enum: FileType,
    nullable: false,
  })
  type: FileType;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  url: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  mimeType: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  size: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
