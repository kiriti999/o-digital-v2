import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Delete,
  Res,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Request, Response } from 'express';
import { TaskService } from './task.service';
import { LoggerService } from 'src/utils/logger/logger.service';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UserService } from 'src/user/user.service';

@Controller('tasks')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly loggerService: LoggerService,
    private readonly userService: UserService,
  ) {}

  @Post('create')
  async addTask(
    @Body() createTaskDto: CreateTaskDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const { id } = req.user;
    const user = await this.userService.findById(id);
    if (!user)
      return res
        .status(404)
        .json(this.loggerService.error(404, 'User not found'));
    const payload = await this.taskService.createTask(user, createTaskDto);
    return res
      .status(200)
      .json(this.loggerService.success('Task created successfully', payload));
  }

  @Get()
  async findAll(@Req() req: Request, @Res() res: Response): Promise<any> {
    const { id } = req.user;
    const tasks = await this.taskService.findAll(id);
    if (!tasks.length)
      return res
        .status(200)
        .json(this.loggerService.error(200, 'No tasks found'));
    return res
      .status(200)
      .json(this.loggerService.success('Tasks fetched successfully', tasks));
  }

  @Patch(':id')
  async updateTask(
    @Param() params,
    @Req() req: Request,
    @Body() updateTaskDto: UpdateTaskDto,
    @Res() res: Response,
  ): Promise<any> {
    const { id } = params;
    const task = await this.taskService.findById(id);
    if (!task)
      return res
        .status(404)
        .json(this.loggerService.error(404, 'No tasks found'));
    const updatedTask = await this.taskService.updateSingleTask(
      task,
      updateTaskDto,
    );
    return res
      .status(200)
      .json(
        this.loggerService.success('Task updated successfully', updatedTask),
      );
  }

  @Delete(':id')
  async deleteTask(
    @Param() params,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const { id } = params;
    const task = await this.taskService.findById(id);
    if (!task)
      return res
        .status(404)
        .json(this.loggerService.error(404, 'No tasks found'));
    this.taskService.deleteSingleTask(task);
    return res
      .status(200)
      .json(this.loggerService.success('Task deleted successfully'));
  }
}
