"use client";

import "../globals.css";
import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavigationConfig } from "../_lib/types";
import HomeIcon from "@mui/icons-material/Home";
import ShareIcon from "@mui/icons-material/Share";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import UploadDialog from "../components/UploadDialog";

export default function VideoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openModal, setOpenModal] = useState(false);
  const drawerWidth = 200;
  const navigationConfig: NavigationConfig[] = [
    {
      url: "/videos/private",
      icon: <HomeIcon />,
      label: "Private",
    },
    {
      url: "/videos/shared",
      icon: <ShareIcon />,
      label: "Shared",
    },
  ];

  return (
    <div className="flex bg-gray-50 dark:bg-gray-900">
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          boxShadow: "none",
          borderBottom: "1px solid black",
        }}
        color="transparent"
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <a
            href="#"
            className="flex items-center text-2xl font-semibold text-gray-900 dark:text-dark"
          >
            <img
              className="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            Vidora
          </a>
          <div className="flex gap-2">
            <IconButton onClick={() => setOpenModal(true)}>
              <CloudUploadOutlinedIcon />
            </IconButton>
            <IconButton>
              <SettingsOutlinedIcon />
            </IconButton>
            <IconButton>
              <NotificationsOutlinedIcon />
            </IconButton>
            <Avatar>A</Avatar>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className="bg-gray-900 flex-shrink-0"
        variant="permanent"
        open
        sx={{
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "gray",
          },
        }}
      >
        <Toolbar />
        <Box className="overflow-auto">
          <List>
            {navigationConfig.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
      <UploadDialog isOpen={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
}
