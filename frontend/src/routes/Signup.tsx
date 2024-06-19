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
import { signupSchema } from "../utils/validations";
import { toast } from "react-toastify";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useRegistration } from "../api/hooks/auth";

export default function Signup() {
  const navigate = useNavigate();
  const { mutate, isPending } = useRegistration();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFromValues>({ resolver: yupResolver(signupSchema) });
  const onSubmit: SubmitHandler<SignupFromValues> = async (data) => {
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
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <CustomInput
                  title="First Name"
                  name="firstName"
                  error={errors.firstName?.message}
                  register={register}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomInput
                  title="Last Name"
                  name="lastName"
                  error={errors.lastName?.message}
                  register={register}
                />
              </Grid>
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
              <Grid item xs={12}>
                <CustomInput
                  title="Confirm Password"
                  name="confirmPassword"
                  error={errors.confirmPassword?.message}
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
              {!isPending && "Sign Up"}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={RouterLink} to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
