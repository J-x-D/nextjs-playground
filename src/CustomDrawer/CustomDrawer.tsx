import React, { ReactNode } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Grid4x4, Home } from "@mui/icons-material";
import Link from "next/link";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import Login from "../Login/Login";

type DrawerItem = {
  link: string;
  icon: ReactNode;
  text: string;
};

const drawerItems: DrawerItem[] = [
  {
    icon: <Home />,
    text: "Home",
    link: "/home",
  },
  {
    icon: <Grid4x4 />,
    text: "Table",
    link: "/table",
  },
  {
    icon: <DynamicFormIcon />,
    text: "Form",
    link: "/form",
  },
];

export default function CustomDrawer({
  isDrawerOpen,
  setIsDrawerOpen,
}: {
  isDrawerOpen: boolean;
  setIsDrawerOpen: Function;
}) {
  return (
    <Drawer
      anchor="left"
      open={isDrawerOpen}
      onClose={() => setIsDrawerOpen(false)}
    >
      <List sx={{ width: 250 }}>
        {drawerItems.map((item) => (
          <Link href={item.link} passHref key={item.text}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Drawer>
  );
}
