import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export type TaskStatus = 'pending' | 'in_progress' | 'done';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'in_progress', 'done'],
    default: 'pending',
  })
  status: TaskStatus;

  @ManyToOne((type) => User, (user) => user.tasks, { onDelete: 'CASCADE' })
  user: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
