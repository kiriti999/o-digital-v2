import { Injectable, Req, Res } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UserService } from 'src/user/user.service';
import { LoggerService } from 'src/utils/logger/logger.service';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Response } from 'express';
import { User } from 'src/user/user.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
    private readonly userService: UserService,
    private readonly loggerService: LoggerService,
  ) {}

  async findAll(userId: number): Promise<Task[]> {
    return await this.tasksRepository.find({ where: { user: { id: userId } } });
  }

  async findById(id: string): Promise<Task> {
    return await this.tasksRepository.findOneBy({ id });
  }

  async createTask(user: User, createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.user = user;
    await this.tasksRepository.save(task);
    await this.userService.addTask(user, task);
    delete task.user;
    return task;
  }

  async updateSingleTask(
    task: Task,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    const { title, description, status } = updateTaskDto;
    task.title = title;
    task.description = description;
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }

  async deleteSingleTask(task: Task): Promise<void> {
    await this.tasksRepository.remove(task);
  }
}
