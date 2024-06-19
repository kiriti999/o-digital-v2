import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  readonly title: string;

  readonly description: string;
}
