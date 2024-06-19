import apiClient from "../apiClient";

export const fetchTasks = async (token: string) => {
  const { data } = await apiClient.get(`/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const createTask = async (body: TaskFormValues, token: string) => {
  const { data } = await apiClient.post("/tasks/create", body, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const updateTask = async (
  body: UpdateTaskFormValues,
  taskId: string,
  token: string
) => {
  const { data } = await apiClient.patch(`/tasks/${taskId}`, body, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const deleteTask = async (taskId: string, token: string) => {
  const { data } = await apiClient.delete(`/tasks/${taskId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
