declare module "*.module.css" {
  const content: Record<string, string>;
  export default content;
}

interface IUser {
  name: string;
}

interface SignupFromValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginFormValues {
  email: string;
  password: string;
}

interface TaskFormValues {
  title: string;
  description: string;
}

type TaskStatus = "pending" | "in_progress" | "done";

interface EditTaskValues {
  title: string;
  description: string;
  status: TaskStatus;
}

interface ITask {
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}

interface AuthState {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  token: string | null;
}

interface BaseResponse {
  message: string;
  statusCode: number;
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

interface DbUser {
  firstName: string;
  lastName: string;
  id: number;
  email: string;
  createdAt: string;
  updatedAt: string;
  task: Task[];
}

interface LoginResponse extends BaseResponse {
  data: {
    accessToken: string;
    expiresIn: number;
    user: DbUser;
  };
}

interface UpdateTaskFormValues extends TaskFormValues {
  status: TaskStatus;
}

interface FetchAllTasksResponse extends BaseResponse {
  data: Task[];
}

interface CreateTaskResponse extends BaseResponse {
  data: Task;
}
