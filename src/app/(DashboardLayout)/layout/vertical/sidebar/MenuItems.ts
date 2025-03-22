// Imports
import { uniqueId } from "lodash";

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
import {
  IconPoint,
  IconEdit,
  IconApps,
  IconFileDescription,
  IconFileDots,
  IconFiles,
  IconBorderAll,
  IconBorderHorizontal,
  IconBorderInner,
  IconBorderVertical,
  IconBorderTop,
  IconUserCircle,
  IconLogin,
  IconUserPlus,
  IconRotate,
  IconBox,
  IconAperture,
  IconHelp,
  IconZoomCode,
  IconBoxAlignBottom,
  IconBoxAlignLeft,
  IconBorderStyle2,
  IconLockAccess,
  IconAppWindow,
  IconFileCheck,
  IconCalendar,
  IconCar,
  IconList,
  IconUser,
  IconPassword,
  IconNotification,
} from "@tabler/icons-react";

const Menuitems: MenuitemsType[] = [
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
  },

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
  },
  {
    id: uniqueId(),
    title: "Notifications",
    icon: IconNotification,
    href: "/user/notifications",
    chipColor: "secondary",
  },
  {
    id: uniqueId(),
    title: "Change password",
    icon: IconPassword,
    href: "/user/changePassword",
    chipColor: "secondary",
  },
];

export default Menuitems;
