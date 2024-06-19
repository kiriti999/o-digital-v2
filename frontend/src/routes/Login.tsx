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
import { loginSchema, signupSchema } from "../utils/validations";
import { toast } from "react-toastify";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useLogin } from "../api/hooks/auth";

export default function Login() {
  const navigate = useNavigate();
  const { mutate, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: yupResolver(loginSchema) });
  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    mutate(data);
  };

  return (
    <Box>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CustomInput
                  title="Email"
                  name="email"
                  error={errors.email?.message}
                  register={register}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomInput
                  title="Passoword"
                  name="password"
                  error={errors.password?.message}
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
              {!isPending && "Log in"}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={RouterLink} to="/signup" variant="body2">
                  don't have an account? Sign up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
