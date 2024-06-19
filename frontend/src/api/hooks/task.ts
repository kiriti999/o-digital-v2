import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  createTask,
  deleteTask,
  fetchTasks,
  updateTask,
} from "../endpoints/task";
import { useNavigate } from "react-router-dom";

export const useFindAllTasks = (token: string) => {
  return useQuery<any, Error, FetchAllTasksResponse, string[]>({
    queryKey: ["Task"],
    queryFn: () => fetchTasks(token),
  });
};

export const useAddTask = (token: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (body: TaskFormValues) => createTask(body, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Task"] });
      navigate("/home/tasks");
      toast("Task created successfully", { type: "success" });
    },
    onError: (err: any) => {
      toast(err.response.data.message ?? "Something went wrong", {
        type: "error",
      });
    },
  });
};

export const useUpdateSingleTask = (taskId: string, token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateTaskFormValues) => updateTask(body, taskId, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Task"] });
      toast("Task updated successfully", { type: "success" });
    },
    onError: (err: any) => {
      toast(err.response.data.message ?? "Something went wrong", {
        type: "error",
      });
    },
  });
};

export const useDeleteSingleTask = (taskId: string, token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteTask(taskId, token),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["Task"] });
      }, 500);
      toast("Task deleted successfully", { type: "success" });
    },
    onError: (err: any) => {
      toast(err.response.data.message ?? "Something went wrong", {
        type: "error",
      });
    },
  });
};
