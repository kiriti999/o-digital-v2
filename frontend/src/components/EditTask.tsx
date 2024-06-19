import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Link,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import CustomInput from "../components/CustomInput/CustomInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addTaskSchema } from "../utils/validations";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useEffect, useState } from "react";
import { useUpdateSingleTask } from "../api/hooks/task";
import { useSelector } from "react-redux";

interface Props {
  selectedTask?: Task;
  setIsEditModal: (value: boolean) => void;
}

export default function EditTask(props: Props) {
  const { selectedTask, setIsEditModal } = props;
  const [status, setStatus] = useState<TaskStatus>(
    selectedTask?.status ?? "pending"
  );
  const { token } = useSelector((state: any) => state.auth);
  const { mutate, isPending, isSuccess } = useUpdateSingleTask(
    selectedTask?.id!,
    token
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: yupResolver(addTaskSchema),
    defaultValues: {
      title: selectedTask?.title ?? "",
      description: selectedTask?.description ?? "",
    },
  });
  const onSubmit: SubmitHandler<TaskFormValues> = (data) => {
    const payload: UpdateTaskFormValues = {
      status,
      ...data,
    };
    mutate(payload);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value as TaskStatus;
    setStatus(value);
  };

  useEffect(() => {
    if (isSuccess) setIsEditModal(false);
  }, [isSuccess]);

  return (
    <Box>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit Task
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
              <Grid item xs={12}>
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Status
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={status}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="pending"
                      control={<Radio />}
                      label="Pending"
                    />
                    <FormControlLabel
                      value="in_progress"
                      control={<Radio />}
                      label="In progress"
                    />
                    <FormControlLabel
                      value="done"
                      control={<Radio />}
                      label="Done"
                    />
                  </RadioGroup>
                </FormControl>
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
              {!isPending && "Update"}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
