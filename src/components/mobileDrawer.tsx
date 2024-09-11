"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { CiMenuBurger } from "react-icons/ci";
import {
  active_analytics,
  active_courses,
  active_settings,
  active_user,
  analytics,
  courses,
  settings,
  user,
} from "@/assets/icons";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../public/images/logo.svg";

const MobileDrawer = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const links = [
    { name: "analytics", activeIcon: active_analytics, icon: analytics },
    { name: "users", activeIcon: active_user, icon: user },
    { name: "courses", activeIcon: active_courses, icon: courses },
    { name: "settings", activeIcon: active_settings, icon: settings },
  ];

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {links.map((link, index) => (
          <ListItem key={index}>
            <ListItemButton
              className={`${
                pathname.includes(link.name)
                  ? "bg-primary text-white rounded-[6px]"
                  : ""
              } p-6 py-4 pl-3 flex gap-4 items-center cursor-pointer`}
              onClick={() => router.push(link.name)}
            >
              <Image
                src={pathname.includes(link.name) ? link.activeIcon : link.icon}
                alt={link.name}
                width={30}
              />
              <ListItemText className="capitalize" primary={link.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div className="flex md:hidden">
      <Button onClick={toggleDrawer(true)}>
        <CiMenuBurger size={20} color="black" />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <div className="pl-6 py-4 pb-0">
          <Image src={logo} alt="skill 2 rural" width={180} />
        </div>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default MobileDrawer;
