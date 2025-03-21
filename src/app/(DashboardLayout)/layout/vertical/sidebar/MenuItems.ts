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
    subheader: "Apps",
  },

  {
    id: uniqueId(),
    title: "Users",
    icon: IconUserCircle,
    href: "/apps/user-profile/profile",
    children: [
      {
        id: uniqueId(),
        title: "Profile",
        icon: IconPoint,
        href: "/apps/user-profile/profile",
      },
      {
        id: uniqueId(),
        title: "Followers",
        icon: IconPoint,
        href: "/apps/user-profile/followers",
      },
      {
        id: uniqueId(),
        title: "Friends",
        icon: IconPoint,
        href: "/apps/user-profile/friends",
      },
      {
        id: uniqueId(),
        title: "Gallery",
        icon: IconPoint,
        href: "/apps/user-profile/gallery",
      },
    ],
  },

  {
    id: uniqueId(),
    title: "Invoice",
    icon: IconFileCheck,
    href: "/apps/invoice/list",
    children: [
      {
        id: uniqueId(),
        title: "List",
        icon: IconPoint,
        href: "/apps/invoice/list",
      },
      {
        id: uniqueId(),
        title: "Details",
        icon: IconPoint,
        href: "/apps/invoice/detail/PineappleInc",
      },
      {
        id: uniqueId(),
        title: "Create",
        icon: IconPoint,
        href: "/apps/invoice/create",
      },
      {
        id: uniqueId(),
        title: "Edit",
        icon: IconPoint,
        href: "/apps/invoice/edit/PineappleInc",
      },
    ],
  },

  {
    navlabel: true,
    subheader: "Pages",
  },
  {
    id: uniqueId(),
    title: "Roll Base Access",
    icon: IconLockAccess,
    href: "/theme-pages/casl",
  },
  {
    id: uniqueId(),
    title: "FAQ",
    icon: IconHelp,
    href: "/theme-pages/faq",
  },
  {
    id: uniqueId(),
    title: "Landingpage",
    icon: IconAppWindow,
    href: "/landingpage",
  },

  {
    navlabel: true,
    subheader: "Forms",
  },
  {
    id: uniqueId(),
    title: "Form Elements",
    icon: IconApps,
    href: "/forms/form-elements/autocomplete",
    children: [
      {
        id: uniqueId(),
        title: "Autocomplete",
        icon: IconPoint,
        href: "/forms/form-elements/autocomplete",
      },
      {
        id: uniqueId(),
        title: "Button",
        icon: IconPoint,
        href: "/forms/form-elements/button",
      },
      {
        id: uniqueId(),
        title: "Checkbox",
        icon: IconPoint,
        href: "/forms/form-elements/checkbox",
      },
      {
        id: uniqueId(),
        title: "Radio",
        icon: IconPoint,
        href: "/forms/form-elements/radio",
      },
      {
        id: uniqueId(),
        title: "Date Time",
        icon: IconPoint,
        href: "/forms/form-elements/date-time",
      },
      {
        id: uniqueId(),
        title: "Slider",
        icon: IconPoint,
        href: "/forms/form-elements/slider",
      },
      {
        id: uniqueId(),
        title: "Switch",
        icon: IconPoint,
        href: "/forms/form-elements/switch",
      },
    ],
  },
  {
    id: uniqueId(),
    title: "Form Layout 1",
    icon: IconFileDescription,
    href: "/profile",
  },
  {
    id: uniqueId(),
    title: "Form Layout",
    icon: IconFileDescription,
    href: "/forms/form-layout",
  },
  {
    id: uniqueId(),
    title: "Form Horizontal",
    icon: IconBoxAlignBottom,
    href: "/forms/form-horizontal",
  },
  {
    id: uniqueId(),
    title: "Form Vertical",
    icon: IconBoxAlignLeft,
    href: "/forms/form-vertical",
  },
  {
    id: uniqueId(),
    title: "Form Custom",
    icon: IconFileDots,
    href: "/forms/form-custom",
  },
  {
    id: uniqueId(),
    title: "Form Wizard",
    icon: IconFiles,
    href: "/forms/form-wizard",
  },
  {
    id: uniqueId(),
    title: "Form Validation",
    icon: IconFiles,
    href: "/forms/form-validation",
  },
  {
    id: uniqueId(),
    title: "Quill Editor",
    icon: IconEdit,
    href: "/forms/form-quill",
  },
  {
    navlabel: true,
    subheader: "Tables",
  },
  {
    id: uniqueId(),
    title: "Basic",
    icon: IconBorderAll,
    href: "/tables/basic",
  },
  {
    id: uniqueId(),
    title: "Collapsible",
    icon: IconBorderHorizontal,
    href: "/tables/collapsible",
  },
  {
    id: uniqueId(),
    title: "Enhanced",
    icon: IconBorderInner,
    href: "/tables/enhanced",
  },
  {
    id: uniqueId(),
    title: "Fixed Header",
    icon: IconBorderVertical,
    href: "/tables/fixed-header",
  },
  {
    id: uniqueId(),
    title: "Pagination",
    icon: IconBorderTop,
    href: "/tables/pagination",
  },
  {
    id: uniqueId(),
    title: "Search",
    icon: IconBorderStyle2,
    href: "/tables/search",
  },
  {
    id: uniqueId(),
    title: "React Table",
    icon: IconBorderStyle2,
    href: "/react-tables/basic",
    children: [
      {
        id: uniqueId(),
        title: "Basic",
        icon: IconPoint,
        href: "/react-tables/basic",
      },
      {
        id: uniqueId(),
        title: "Dense",
        icon: IconPoint,
        href: "/react-tables/dense",
      },
      {
        id: uniqueId(),
        title: "Filter",
        icon: IconPoint,
        href: "/react-tables/filter",
      },
      {
        id: uniqueId(),
        title: "Row Selection",
        icon: IconPoint,
        href: "/react-tables/row-selection",
      },
      {
        id: uniqueId(),
        title: "Pagination",
        icon: IconPoint,
        href: "/react-tables/pagination",
      },
      {
        id: uniqueId(),
        title: "Sorting",
        icon: IconPoint,
        href: "/react-tables/sorting",
      },
      {
        id: uniqueId(),
        title: "Column Visibility",
        icon: IconPoint,
        href: "/react-tables/column-visiblity",
      },
      {
        id: uniqueId(),
        title: "Drag n Drop",
        icon: IconPoint,
        href: "/react-tables/drag-n-drop",
      },
      {
        id: uniqueId(),
        title: "Editable",
        icon: IconPoint,
        href: "/react-tables/editable",
      },
      {
        id: uniqueId(),
        title: "Empty",
        icon: IconPoint,
        href: "/react-tables/empty",
      },
      {
        id: uniqueId(),
        title: "Expand",
        icon: IconPoint,
        href: "/react-tables/expanding",
      },
      {
        id: uniqueId(),
        title: "Sticky",
        icon: IconPoint,
        href: "/react-tables/sticky",
      },
    ],
  },
  {
    navlabel: true,
    subheader: "UI",
  },
  {
    id: uniqueId(),
    title: "Ui Components",
    icon: IconBox,
    href: "/ui-components/alert",
    children: [
      {
        id: uniqueId(),
        title: "Alert",
        icon: IconPoint,
        href: "/ui-components/alert",
      },
      {
        id: uniqueId(),
        title: "Accordion",
        icon: IconPoint,
        href: "/ui-components/accordion",
      },
      {
        id: uniqueId(),
        title: "Avatar",
        icon: IconPoint,
        href: "/ui-components/avatar",
      },
      {
        id: uniqueId(),
        title: "Chip",
        icon: IconPoint,
        href: "/ui-components/chip",
      },
      {
        id: uniqueId(),
        title: "Dialog",
        icon: IconPoint,
        href: "/ui-components/dialog",
      },
      {
        id: uniqueId(),
        title: "List",
        icon: IconPoint,
        href: "/ui-components/list",
      },
      {
        id: uniqueId(),
        title: "Popover",
        icon: IconPoint,
        href: "/ui-components/popover",
      },
      {
        id: uniqueId(),
        title: "Rating",
        icon: IconPoint,
        href: "/ui-components/rating",
      },
      {
        id: uniqueId(),
        title: "Tabs",
        icon: IconPoint,
        href: "/ui-components/tabs",
      },
      {
        id: uniqueId(),
        title: "Tooltip",
        icon: IconPoint,
        href: "/ui-components/tooltip",
      },
      {
        id: uniqueId(),
        title: "Transfer List",
        icon: IconPoint,
        href: "/ui-components/transfer-list",
      },
      {
        id: uniqueId(),
        title: "Typography",
        icon: IconPoint,
        href: "/ui-components/typography",
      },
    ],
  },
  {
    navlabel: true,
    subheader: "Auth",
  },

  {
    id: uniqueId(),
    title: "Login",
    icon: IconLogin,
    href: "/auth/auth1/login",
    children: [
      {
        id: uniqueId(),
        title: "Side Login",
        icon: IconPoint,
        href: "/auth/auth1/login",
      },
      {
        id: uniqueId(),
        title: "Boxed Login",
        icon: IconPoint,
        href: "/auth/auth2/login",
      },
    ],
  },
  {
    id: uniqueId(),
    title: "Register",
    icon: IconUserPlus,
    href: "/auth/auth1/register",
    children: [
      {
        id: uniqueId(),
        title: "Side Register",
        icon: IconPoint,
        href: "/auth/auth1/register",
      },
      {
        id: uniqueId(),
        title: "Boxed Register",
        icon: IconPoint,
        href: "/auth/auth2/register",
      },
    ],
  },
  {
    id: uniqueId(),
    title: "Forgot Password",
    icon: IconRotate,
    href: "/auth/auth1/forgot-password",
    children: [
      {
        id: uniqueId(),
        title: "Side Forgot Password",
        icon: IconPoint,
        href: "/auth/auth1/forgot-password",
      },
      {
        id: uniqueId(),
        title: "Boxed Forgot Password",
        icon: IconPoint,
        href: "/auth/auth2/forgot-password",
      },
    ],
  },

  {
    id: uniqueId(),
    title: "Two Steps",
    icon: IconZoomCode,
    href: "/auth/auth1/two-steps",
    children: [
      {
        id: uniqueId(),
        title: "Side Two Steps",
        icon: IconPoint,
        href: "/auth/auth1/two-steps",
      },
      {
        id: uniqueId(),
        title: "Boxed Two Steps",
        icon: IconPoint,
        href: "/auth/auth2/two-steps",
      },
    ],
  },
];

export default Menuitems;
