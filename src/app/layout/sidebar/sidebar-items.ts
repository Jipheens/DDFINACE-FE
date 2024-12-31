import { RouteInfo } from "./sidebar.metadata";
export const ROUTES: RouteInfo[] = [


  {
    path: "/dashboard/dashboard",
    title: "Dashboard",
    moduleName: "dashboard",
    iconType: "feather",
    icon: "monitor",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["All"],
    privilege: ["Dashboard"],
    submenu: [],
  },

  {
    path: "",
    title: "POLICIES",
    moduleName: "policies",
    iconType: "feather",
    icon: "grid",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["All"],
    privilege: ["Approved Requisitions", "All Rfqs", "Manage Rfqs"],
    submenu: [

      {
        path: "/policies/all-policies",
        title: "All Policies",
        moduleName: "policies",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: ["All"],
        privilege: ["All Rfqs"],
        submenu: [],
      },
      // {
      //   path: "/policies/manage-policies",
      //   title: "Manage Policies",
      //   moduleName: "policies",
      //   iconType: "",
      //   icon: "",
      //   class: "ml-menu",
      //   groupTitle: false,
      //   badge: "",
      //   badgeClass: "",
      //   role: ["All"],
      //   privilege: ["Manage Rfqs"],
      //   submenu: [],
      // },

    ],

  },
 

];
