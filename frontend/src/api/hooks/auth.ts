import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser, registerUser } from "../endpoints/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLogin } from "../../store/reducer/authSlice";

export const useRegistration = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      navigate("/login");
      toast("Registration successfull", { type: "success" });
    },
    onError: (err: any) => {
      toast(err.response.data.message ?? "Something went wrong", {
        type: "error",
      });
    },
  });
};

export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data: LoginResponse) => {
      const { user, accessToken } = data.data;
      const { email, firstName, lastName } = user;
      const storePayload: AuthState = {
        firstName,
        lastName,
        token: accessToken,
        email,
      };
      dispatch(setLogin(storePayload));
      navigate("/home/tasks");
      toast("Login successfull", { type: "success" });
    },
    onError: (err: any) => {
      toast(err.response.data.message ?? "Something went wrong", {
        type: "error",
      });
    },
  });
};
