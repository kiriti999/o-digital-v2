import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { tasks } from "../utils/mockData";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomModal from "../components/CustomModal";
import EditTask from "../components/EditTask";
import { useDeleteSingleTask, useFindAllTasks } from "../api/hooks/task";
import { useSelector } from "react-redux";

export default function Tasks() {
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task>();
  const { token } = useSelector((state: any) => state.auth);
  const { data, isLoading } = useFindAllTasks(token);
  const { mutate, isPending, isSuccess } = useDeleteSingleTask(
    selectedTask?.id!,
    token
  );

  const handleDeleteTask = () => {
    mutate();
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsEditModal(true);
  };

  useEffect(() => {
    if (isSuccess) setIsDeleteModal(false);
  }, [isSuccess]);

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={24} color="primary" />
      </Box>
    );
  } else
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell width="20%">Title</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="center" width="15%">
                Status
              </TableCell>
              <TableCell align="center" width="15%">
                Created At
              </TableCell>
              <TableCell align="center" width="15%">
                Updated At
              </TableCell>
              <TableCell align="center" width="15%">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data?.map((task, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {task.title}
                </TableCell>
                <TableCell align="left" sx={{ maxWidth: 300 }}>
                  {task.description}
                </TableCell>
                <TableCell align="center">{task.status}</TableCell>
                <TableCell align="center">
                  {new Date(task.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell align="center">
                  {new Date(task.updatedAt).toLocaleDateString()}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    sx={{ mr: 1 }}
                    onClick={() => handleEditTask(task)}
                  >
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setSelectedTask(task);
                      setIsDeleteModal(true);
                    }}
                    color="error"
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {!data?.data?.length && (
          <Typography textAlign="center" width="100%" color="#cc0000">
            No tasks
          </Typography>
        )}
        <CustomModal
          open={isDeleteModal}
          setOpen={setIsDeleteModal}
          width="30%"
          padding={4}
        >
          <Box>
            <Typography variant="h5" textAlign="center">
              Are you sure?
            </Typography>
            <Typography textAlign="center">
              Task will be deleted permanently and cannot be recovered again
            </Typography>
            <Box
              mt={3}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 3,
              }}
            >
              <Button
                onClick={() => setIsDeleteModal(false)}
                variant="outlined"
                sx={{ minWidth: 100 }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteTask}
                variant="contained"
                color="error"
                sx={{ minWidth: 100 }}
              >
                {isPending && (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                )}
                {!isPending && "Delete"}
              </Button>
            </Box>
          </Box>
        </CustomModal>
        <CustomModal
          open={isEditModal}
          setOpen={setIsEditModal}
          width="-webkit-fill-available"
          padding={4}
        >
          <EditTask
            selectedTask={selectedTask}
            setIsEditModal={setIsEditModal}
          />
        </CustomModal>
      </TableContainer>
    );
}
