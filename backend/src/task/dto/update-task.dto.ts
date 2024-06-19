import { IsEnum, IsNotEmpty } from 'class-validator';

export enum TaskStatusEnum {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

export class UpdateTaskDto {
  @IsNotEmpty()
  readonly title: string;

  readonly description: string;

  @IsNotEmpty()
  @IsEnum(TaskStatusEnum)
  readonly status: TaskStatusEnum;
}
