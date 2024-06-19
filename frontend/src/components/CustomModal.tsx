import { Box, Modal, Typography } from "@mui/material";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  open: boolean;
  setOpen: (value: boolean) => void;
  width: string;
  padding: number;
}

export default function CustomModal(props: Props) {
  const { open, setOpen, children, width, padding } = props;

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width,
          minWidth: 300,
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 5,
          padding,
        }}
      >
        {children}
      </Box>
    </Modal>
  );
}
