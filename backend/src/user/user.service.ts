import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { hashPassword } from 'src/utils/password';
import { Task } from 'src/task/task.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { firstName, lastName, email, password } = createUserDto;
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = await hashPassword(password);
    user.tasks = [];
    return this.usersRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({
      where: { email },
      relations: ['tasks'],
    });
  }

  async findById(id: number): Promise<User | null> {
    return await this.usersRepository.findOne({
      where: { id },
      relations: ['tasks'],
    });
  }

  async addTask(user: User, task: Task): Promise<any> {
    user.tasks.push(task);
    await this.usersRepository.save(user);
  }
}
