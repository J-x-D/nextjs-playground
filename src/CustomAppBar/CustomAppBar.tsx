import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "./CustomAppBar.module.scss";
import Login from "../Login/Login";
import { useSession } from "next-auth/react";
import CustomDrawer from "../CustomDrawer/CustomDrawer";
import LanguageToggle from "../LanguageToggle/LanguageToggle";

export default function CustomAppBar() {
  const { data: session } = useSession();

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  return (
    <div>
      <AppBar position="static" className={styles.root}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {session?.user?.name ? `Hi, ${session?.user?.name}` : "Demo"}
          </Typography>

          <LanguageToggle />
          <Login />
        
        </Toolbar>
      </AppBar>
      <CustomDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
    </div>
  );
}
