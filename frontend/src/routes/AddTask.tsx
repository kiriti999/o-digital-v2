import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import CustomInput from "../components/CustomInput/CustomInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addTaskSchema, loginSchema, signupSchema } from "../utils/validations";
import { toast } from "react-toastify";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import { useAddTask } from "../api/hooks/task";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function AddTask() {
  const { token } = useSelector((state: any) => state.auth);
  const { mutate, isPending } = useAddTask(token);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormValues>({ resolver: yupResolver(addTaskSchema) });
  const onSubmit: SubmitHandler<TaskFormValues> = (data) => {
    mutate(data);
  };

  return (
    <Box>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            my: 7,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <FileDownloadDoneIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Task
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CustomInput
                  title="Title"
                  name="title"
                  error={errors.title?.message}
                  register={register}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomInput
                  title="Description"
                  name="description"
                  error={errors.description?.message}
                  register={register}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {isPending && (
                <CircularProgress size={24} sx={{ color: "white" }} />
              )}
              {!isPending && "+ Add"}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
