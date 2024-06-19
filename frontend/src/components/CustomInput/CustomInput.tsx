import { Box, TextField, Typography } from "@mui/material";
import styles from "./input.module.css";
import { UseFormRegister } from "react-hook-form";

interface Props {
  title: string;
  name: string;
  register: UseFormRegister<any>;
  error?: string;
  type?: string;
  value?: string;
}

export default function CustomInput(props: Props) {
  const { title, name, error, type, value, register } = props;
  return (
    <Box>
      <TextField
        defaultValue={value}
        fullWidth
        className={styles.input}
        placeholder={title}
        variant="outlined"
        type={type ?? "text"}
        {...register(name)}
      />
      <Typography sx={{ minHeight: 24, fontSize: 15, color: "#cc0000" }}>
        {error ?? ""}
      </Typography>
    </Box>
  );
}
