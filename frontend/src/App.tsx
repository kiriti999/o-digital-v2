import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./app.module.css";

function App() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h1" className={styles.appTitle}>
        Task Management App
      </Typography>
      <Box
        mt={4}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
        }}
      >
        <Button
          variant="contained"
          sx={{ minWidth: 100 }}
          onClick={() => navigate("/signup")}
        >
          Sign up
        </Button>
        <Button
          variant="contained"
          sx={{ minWidth: 100 }}
          onClick={() => navigate("/login")}
        >
          Log in
        </Button>
      </Box>
    </Box>
  );
}

export default App;
