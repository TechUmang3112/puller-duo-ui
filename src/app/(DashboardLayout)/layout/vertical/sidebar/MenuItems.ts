import { uniqueId } from "lodash";
import {
  IconAperture,
  IconList,
  IconCar,
  IconCalendar,
  IconUser,
  IconListCheck,
  IconBus,
  IconMapPin,
  IconNotification,
  IconPassword,
} from "@tabler/icons-react";

interface MenuitemsType {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: string;
  children?: MenuitemsType[];
  chip?: string;
  chipColor?: string;
  variant?: string;
  external?: boolean;
}

const getMenuItems = () => {
  // Check if we're on the client side
  const isClient = typeof window !== "undefined";
  const userType = isClient ? localStorage.getItem("user_type") : null;

  const baseItems: MenuitemsType[] = [
    {
      navlabel: true,
      subheader: "Home",
    },
    {
      id: uniqueId(),
      title: "Dashboard",
      icon: IconAperture,
      href: "/",
      chipColor: "secondary",
    },
  ];

  // Add items for non-admin users (user_type != 2)
  if (userType !== "2") {
    baseItems.push(
      {
        navlabel: true,
        subheader: "Rides",
      },
      {
        id: uniqueId(),
        title: "My Rides",
        icon: IconList,
        href: "/user/myRides",
        chipColor: "secondary",
      },
      {
        id: uniqueId(),
        title: "Current Ride",
        icon: IconCar,
        href: "/user/currentRide",
        chipColor: "secondary",
      },
      {
        id: uniqueId(),
        title: "Upcoming Rides",
        icon: IconCalendar,
        href: "/user/upcomingRides",
        chipColor: "secondary",
      }
    );
  }

  // Add items for admin users (user_type == 2)
  if (userType === "2") {
    baseItems.push(
      {
        navlabel: true,
        subheader: "Manage audience",
      },
      {
        id: uniqueId(),
        title: "Users",
        icon: IconUser,
        href: "/user/list",
        chipColor: "secondary",
      },
      {
        id: uniqueId(),
        title: "Approvals",
        icon: IconListCheck,
        href: "/manage/approvals",
        chipColor: "secondary",
      },
      {
        id: uniqueId(),
        title: "Drivers",
        icon: IconBus,
        href: "/manage/drivers",
        chipColor: "secondary",
      },
      {
        id: uniqueId(),
        title: "Riders",
        icon: IconUser,
        href: "/manage/riders",
        chipColor: "secondary",
      },
      {
        id: uniqueId(),
        title: "Total Rides",
        icon: IconMapPin,
        href: "/manage/totalRides",
        chipColor: "secondary",
      }
    );
  }

  // Common items for all users
  baseItems.push(
    {
      navlabel: true,
      subheader: "User",
    },
    {
      id: uniqueId(),
      title: "My Profile",
      icon: IconUser,
      href: "/user/profile",
      chipColor: "secondary",
    }
  );

  // Notification item only for non-admin users
  if (userType !== "2") {
    baseItems.push({
      id: uniqueId(),
      title: "Notifications",
      icon: IconNotification,
      href: "/user/notifications",
      chipColor: "secondary",
    });
  }

  // Common item for all users
  baseItems.push({
    id: uniqueId(),
    title: "Change password",
    icon: IconPassword,
    href: "/user/changePassword",
    chipColor: "secondary",
  });

  return baseItems;
};

const Menuitems = getMenuItems();
export default Menuitems;
