import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import CalendarIcon from "@mui/icons-material/CalendarToday";
import ArrowForward from "@mui/icons-material/ArrowForward";

interface SidebarProps {
  onUserClick: () => void;
  onCalendarClick: () => void;
  selectedComponent: string;
}

const DrawerSidebar: React.FC<SidebarProps> = ({
  onUserClick,
  onCalendarClick,
  selectedComponent,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        open={drawerOpen}
        onMouseEnter={() => setDrawerOpen(true)}
        onMouseLeave={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: drawerOpen ? 200 : 80,
            transition: "width 0.3s",
            overflowX: "hidden",
          },
        }}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={onUserClick}
              sx={{
                marginBottom: "10%",
                backgroundColor:
                  selectedComponent === "user" ? "#c9ebc9" : "transparent",
                color: selectedComponent === "user" ? "darkgreen" : "inherit",
              }}
            >
              <ListItemIcon>
                <ArrowForward
                  sx={{
                    color: selectedComponent === "user" ? "green" : "inherit",
                  }}
                />
              </ListItemIcon>
              {drawerOpen && <ListItemText primary="User Details" />}
            </ListItemButton>
          </ListItem>

          {/* Calendar */}
          <ListItem disablePadding>
            <ListItemButton
              onClick={onCalendarClick}
              sx={{
                marginBottom: "10%",
                backgroundColor:
                  selectedComponent === "calendar" ? "#c9ebc9" : "transparent",
                color:
                  selectedComponent === "calendar" ? "darkgreen" : "inherit",
              }}
            >
              <ListItemIcon>
                <CalendarIcon
                  sx={{
                    color:
                      selectedComponent === "calendar" ? "green" : "inherit",
                  }}
                />
              </ListItemIcon>
              {drawerOpen && <ListItemText primary="Calendar" />}
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default DrawerSidebar;
