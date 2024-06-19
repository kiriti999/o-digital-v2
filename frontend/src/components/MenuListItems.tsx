import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import ChecklistIcon from "@mui/icons-material/Checklist";

export const mainListItems = (
  navigateToAllTasks: () => void,
  navigateToAddTask: () => void
) => (
  <React.Fragment>
    <ListItemButton onClick={navigateToAllTasks}>
      <ListItemIcon>
        <ChecklistIcon />
      </ListItemIcon>
      <ListItemText primary="Tasks" />
    </ListItemButton>
    <ListItemButton onClick={navigateToAddTask}>
      <ListItemIcon>
        <AddIcon />
      </ListItemIcon>
      <ListItemText primary="Create Task" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (handleLogout: () => void) => (
  <React.Fragment>
    <ListSubheader component="div" inset>
      User actions
    </ListSubheader>
    <ListItemButton onClick={handleLogout}>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Log out" />
    </ListItemButton>
  </React.Fragment>
);
