import apiClient from "../apiClient";

export const registerUser = async (body: SignupFromValues) => {
  const { data } = await apiClient.post("/auth/register", body);
  return data;
};

export const loginUser = async (body: LoginFormValues) => {
  const { data } = await apiClient.post("/auth/login", body);
  return data;
};
